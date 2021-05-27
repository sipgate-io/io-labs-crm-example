import { createWebhookModule } from "sipgateio";
import {getContacts} from "./contacts.js"
import {createSocket} from "./socket.js"
import * as dot from "dotenv"
dot.config()

const serverAddress = process.env.SIPGATE_WEBHOOK_SERVER_ADDRESS;
const serverPort = process.env.SIPGATE_WEBHOOK_PORT;

const client = createSocket();
const webhookModule = createWebhookModule();
webhookModule
  .createServer({
    port: serverPort,
    serverAddress,
  })
  .then((webhookServer) => {
    console.log(
      `Server running at ${serverAddress}\n` +
        "Please set this URL for incoming calls at https://console.sipgate.com/webhooks/urls\n" +
        "ProTip: To see how to do that automatically, check out the example at 'examples/settings/settings_set_url_incoming.ts'\n" +
        "Ready for calls 📞"
    );

    webhookServer.onNewCall(async (newCallEvent) => {
      try {
        let number = newCallEvent.from;
        let name = "Anonymous";
        let surname = "";
        let company = "";

        const contacts = await getContacts();

        if (contacts[number]) {
          name = contacts[number].name;
          surname = contacts[number].surname;
          company = contacts[number].company; 
        } else {
          number = "Anonymous";
        }

        client.emit("incoming", {number: number, name: name, surename: surname, company: company} );

      } catch (error) {
        console.error(error.message);
      }

      console.log(`New call from ${newCallEvent.from} to ${newCallEvent.to}`);

    });

    webhookServer.onHangUp(() => {
      console.log("Hangup!!");
      client.emit("hangup");
    });

    webhookServer.onAnswer(() => {
      console.log("Answer");
      client.emit("answer");
    })
  });
