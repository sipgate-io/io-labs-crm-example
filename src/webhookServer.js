import { createWebhookModule } from 'sipgateio';
import { getContacts } from './contacts.js';
import { createSocket } from './socket.js';
import { getLatestHistoryEntry } from './historyModule.js';
import * as dot from 'dotenv';
dot.config();

const serverAddress = process.env.SIPGATE_WEBHOOK_SERVER_ADDRESS;
const serverPort = process.env.SIPGATE_WEBHOOK_PORT;

const client = createSocket();
const webhookModule = createWebhookModule();


webhookModule
    .createServer({
        port: serverPort,
        serverAddress,
    })
    .then(async (webhookServer) => {
        console.log(
            `Server running at ${serverAddress}\n` +
                'Please set this URL for incoming calls at https://console.sipgate.com/webhooks/urls\n' +
                "ProTip: To see how to do that automatically, check out the example at 'examples/settings/settings_set_url_incoming.ts'\n" +
                'Ready for calls 📞'
        );

        let contacts;
        try {
            contacts = await getContacts();
        } catch (error) {
            console.log(
                'ERROR: Please provide a contacts.json file in the root directory. More information can be obtained in the README.md'
            );
            process.exit(1);
        }

        webhookServer.onNewCall(async (newCallEvent) => {
            try {
                let number = newCallEvent.from;
                let name = 'unknown';
                let surname = 'unknown';
                let company = 'unknown';

                if (contacts[number]) {
                    name = contacts[number].name;
                    surname = contacts[number].surname;
                    company = contacts[number].company;
                }

                client.emit('incoming', {
                    number: number,
                    name: name,
                    surename: surname,
                    company: company,
                });
            } catch (error) {
                console.error(error.message);
            }

            console.log(
                `New call from ${newCallEvent.from} to ${newCallEvent.to}`
            );
        });

        let currentCallId = "";
        webhookServer.onHangUp( async (event) => {
            const timestamp = new Date();
            console.log('Hangup!!');
            console.log(event);
            client.emit('hangup');
            if(event.originalCallId === currentCallId){
                const historyEntry = await getLatestHistoryEntry();
                if(historyEntry.source === event.from && historyEntry.target === event.answeringNumber && historyEntry.status === 'PICKUP'){
                    console.log(historyEntry);
                }
            }
            currentCallId = '';
        });

        webhookServer.onAnswer(async (event) => {
            console.log('Answer');
            console.log(event);
            client.emit('answer');
            if(event.user === "voicemail"){
                currentCallId = event.originalCallId;
            }
        });
    });
