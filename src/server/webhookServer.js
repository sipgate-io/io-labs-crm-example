import {createWebhookModule} from 'sipgateio';
import * as dot from 'dotenv';

export function initWebhookServer() {
    dot.config();

    const serverAddress = process.env.SIPGATE_WEBHOOK_SERVER_ADDRESS;
    const serverPort = process.env.SIPGATE_WEBHOOK_PORT;

    const webhookModule = createWebhookModule();

    return webhookModule
        .createServer({
            port: serverPort,
            serverAddress,
        }).then( (webhookServer) => {
            console.log(
                `Server running at ${serverAddress}\n` +
                'Please set this URL for incoming calls at https://console.sipgate.com/webhooks/urls\n' +
                "ProTip: To see how to do that automatically, check out the example at 'examples/settings/settings_set_url_incoming.ts'\n" +
                'Ready for calls 📞'
            );
            return webhookServer;
        })
}