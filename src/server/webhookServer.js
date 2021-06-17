import { createWebhookModule } from 'sipgateio';
import { getContacts } from './contacts.js';
import { createSocket } from './socket.js';
import { getLatestHistoryEntry } from './historyModule.js';
import * as dot from 'dotenv';
import { convertMp3ToWav } from './audio/urlConverter.js';
import { EventEmitter } from 'events';
import { sendMail } from './mail/mail.js';

dot.config();

const serverAddress = process.env.SIPGATE_WEBHOOK_SERVER_ADDRESS;
const serverPort = process.env.SIPGATE_WEBHOOK_PORT;

const client = createSocket();
const webhookModule = createWebhookModule();

export const emitter = new EventEmitter();

let contacts;
try {
    contacts = getContacts();
} catch (error) {
    process.exit(1);
}

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

        webhookServer.onNewCall((newCallEvent) => handleNewCallEvent(newCallEvent, emitIncomingMessage));
        webhookServer.onHangUp(handleHangUpEvent);
        webhookServer.onAnswer(handleOnAnswerEvent);

    });

const emitIncomingMessage = (data) => {
    client.emit('incoming', data);
}

export async function handleNewCallEvent(newCallEvent, callBack) {
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

        callBack({
            number: number,
            name: name,
            surname: surname,
            company: company,
        });

    } catch (error) {
        console.error(error.message);
    }

    console.log(
        `New call from ${newCallEvent.from} to ${newCallEvent.to}`
    );
}

async function handleHangUpEvent(event) {
    console.log('Hangup');
    client.emit('hangup');
    if (event.cause == 'forwarded') {
        return;
    }
    console.log('fetching history entry...');
    const historyEntry = await getLatestHistoryEntry();
    if (
        historyEntry.source !== event.from ||
        historyEntry.target !== event.answeringNumber ||
        historyEntry.status !== 'PICKUP'
    ) {
        console.log('no new voicemail');
        return;
    }
    console.log('download and convert speech to text...');
    convertMp3ToWav(historyEntry.recordingUrl);
    emitter.once('result', (text) => {
        client.emit('voicemail', {
            text,
            number: historyEntry.source,
            duration: historyEntry.duration,
        });
        sendMail(text, historyEntry);
    });
}

function handleOnAnswerEvent() {
    console.log('Answer');
    client.emit('answer');
}
