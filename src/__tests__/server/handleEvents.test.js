import {createHandleNewCallEvent} from "../../server/event/newCallEventHandler";
import {createHandleHangUpEvent} from "../../server/event/hangUpEventHandler";

test("handleNewCallEvent sends a message with label 'incoming' once", async () => {
    const testNewCallEvent = {
        callId: '',
        direction: 'in',
        event: 'newCall',
        from: '4912354678',
        'fullUserId[]': ['123456789'],
        originalCallId: '',
        to: '49999999',
        'user[]': ['TestUser'],
        'userId[]': ['123456789'],
        xcid: '',
    }
    const sendMessageMock = jest.fn();
    const handleNewCallEvent = createHandleNewCallEvent(sendMessageMock, {})

    await handleNewCallEvent(testNewCallEvent);
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
});

test("handleHangUpEvent sends a message with label 'hangup' once", async () => {

    const testHangUpEvent = {
        event: "hangup",
        cause: "normalClearing",
        callId: "id_12345",
        from: "12345567",
        to: "4915791234567",
        direction: "in",
        answeringNumber: "12345678",
    }

    const historyClient = {
        getLatestHistoryEntry: () => {
            return {
                source: "12345567",
                target: "12345678",
                status: "PICKUP",
            }
        }
    }

    const sendMessageMock = jest.fn();
    const handleHangUpEvent = createHandleHangUpEvent(sendMessageMock, {
        sendMail: () => {
        }
    }, {
        listen: () => {
        }
    }, historyClient)

    await handleHangUpEvent({});
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
});
