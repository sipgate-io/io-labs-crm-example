import {initWebhookServer} from "./webhookServer.js";
import {createHandleNewCallEvent} from "./event/newCallEventHandler.js";
import {createSendSocketMessage, initSocketServer} from "./socket.js";
import {getContacts} from "./contacts.js";
import {createHandleHangUpEvent} from "./event/hangUpEventHandler.js";
import {mailsender} from "./mail/mail.js";
import {consumer} from "./producerConsumer.js";
import {historyClient} from "./historyModule.js";
import {createHandleAnswerEvent} from "./event/answerEventHandler.js";

const socketServer = initSocketServer()
let contacts

try {
    contacts = getContacts();
} catch (error) {
    process.exit(1);
}

initWebhookServer().then(async (webhookServer) => {
    const sendMessage = createSendSocketMessage(socketServer);
    webhookServer.onNewCall(createHandleNewCallEvent(sendMessage, contacts));
    webhookServer.onHangUp(createHandleHangUpEvent(sendMessage, mailsender, consumer, historyClient));
    webhookServer.onAnswer(createHandleAnswerEvent(sendMessage));
});