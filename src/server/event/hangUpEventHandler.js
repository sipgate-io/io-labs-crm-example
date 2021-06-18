import { convertMp3ToWav } from '../audio/urlConverter.js';

export const createHandleHangUpEvent = (
    sendMessage,
    mailsender,
    consumer,
    historyClient
) => {
    return async (hangUpEvent) => {
        console.log('Hangup');
        sendMessage('hangup', {});
        if (hangUpEvent.cause == 'forwarded') {
            return false;
        }
        console.log('fetching history entry...');
        const historyEntry = await historyClient.getLatestHistoryEntry();
        if (
            historyEntry.source !== hangUpEvent.from ||
            historyEntry.target !== hangUpEvent.answeringNumber ||
            historyEntry.status !== 'PICKUP'
        ) {
            console.log('no new voicemail');
            return false;
        }
        console.log('download and convert speech to text...');
        convertMp3ToWav(historyEntry.recordingUrl);
        consumer.listen((text) => {
            sendMessage('voicemail', {
                text,
                number: historyEntry.source,
                duration: historyEntry.duration,
            });
            mailsender.sendMail(text, historyEntry);
        });

        return true;
    };
};
