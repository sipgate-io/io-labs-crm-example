import nodemailer from 'nodemailer';
import * as dot from 'dotenv';
import createHtmlFromTemplate from './mailTemplate.js';

dot.config();

const mailFrom = process.env.MAIL_FROM;
const mailTo = process.env.MAIL_TO;

export const mailsender = {
    sendMail: async (text, historyEntry) => {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        console.log(text);
        let info = await transporter
            .sendMail({
                from: mailFrom,
                to: mailTo,
                subject: `New voicemail from ${historyEntry.source}`,
                text: `${text} \n Die Nachricht steht unter folgendem Link zum Download zur Verfügung: ${historyEntry.recordingUrl} \n Die Nachricht hat eine Länge von ${historyEntry.duration} Sekunden.`,
                html: createHtmlFromTemplate(text, historyEntry),
            })
            .catch(console.error);

        if (!info) {
            return
        }
        console.log('Message sent: %s', info.messageId);

        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}
