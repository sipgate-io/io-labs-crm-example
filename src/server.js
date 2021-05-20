const { createWebhookModule } = require("sipgateio");
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);

async function getContacts() {
  const contactsData = await readFile("contacts.json");
  return JSON.parse(contactsData);
};

const port = 8080;

const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  }
});


let client;
io.on("connection", (socket) => {
  client = socket;
  socket.emit("test", "Hello!");
})

httpServer.listen(8090);

const serverAddress =
  process.env.SIPGATE_WEBHOOK_SERVER_ADDRESS || "https://example.com:8080";

const webhookModule = createWebhookModule();
webhookModule
  .createServer({
    port,
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

        const number = newCallEvent.from;
        let name = "Unknown";
        const contacts = await getContacts();
        if (contacts[number]) {
          name = contacts[number].name;
        }
        console.log(name);
        client.emit("incoming", {number: number, name: name} );

      } catch (error) {
        console.error("Could not find contacts.json: " + error.message);
      }

      console.log(`New call from ${newCallEvent.from} to ${newCallEvent.to}`);

    });

    webhookServer.onHangUp((hangUpEvent) => {
      console.log("Hangup!!");
      client.emit("hangup");
    });
  });
