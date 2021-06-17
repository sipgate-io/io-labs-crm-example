
export const createHandleAnswerEvent = (sendMessage) => {
    return () => {
        console.log('answer');
        sendMessage('answer', {});
    }
}
