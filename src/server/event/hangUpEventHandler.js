export const createHandleHangUpEvent = (
    sendMessage,
    mailsender,
    consumer,
    historyClient,
    convert
) => {
    return async (hangUpEvent) => {
        console.log('Hangup');
        sendMessage('hangup', {});
        if (hangUpEvent.cause != 'normalClearing') {
            return;
        }
        console.log('fetching history entry...');
        const historyEntry = await historyClient.getLatestHistoryEntry();
        if (
            historyEntry.source !== hangUpEvent.from ||
            historyEntry.target !== hangUpEvent.answeringNumber ||
            historyEntry.status !== 'PICKUP'
        ) {
            console.log('no new voicemail');
            return;
        }
        console.log('download and convert speech to text...');
        convert(historyEntry.recordingUrl);
        consumer.listen('result', (text) => {
            sendMessage('voicemail', {
                text,
                number: historyEntry.source,
                duration: historyEntry.duration,
            });
            mailsender.sendMail(text, historyEntry);
        });
    };
};
