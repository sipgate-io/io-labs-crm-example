export const createHandleAnswerEvent = (sendMessage) => {
    return (answerEvent) => {
        let displayCallTimer = true;

        if (!answerEvent.fullUserId) {
            displayCallTimer = false;
        }

        let callInfo = {
            displayCallTimer: displayCallTimer,
        }

        sendMessage('answer', callInfo);
    };
};
