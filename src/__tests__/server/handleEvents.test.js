import {createHandleNewCallEvent} from "../../server/event/newCallEventHandler";
import {createHandleHangUpEvent} from "../../server/event/hangUpEventHandler";
import "core-js/stable";
import "regenerator-runtime/runtime";

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

test("handleNewCallEvent sets parameter correctly if number is found in contacts", async () => {
    const testNewCallEvent = {
        callId: '',
        direction: 'in',
        event: 'newCall',
        from: '+491234567890',
        'fullUserId[]': ['123456789'],
        originalCallId: '',
        to: '49999999',
        'user[]': ['TestUser'],
        'userId[]': ['123456789'],
        xcid: '',
    }

    let number, name, surname, company;
    const sendMessageMock = jest.fn((label, data) => {
        number = data.number;
        name = data.name;
        surname = data.surname;
        company = data.company;
    });

    const handleNewCallEvent = createHandleNewCallEvent(sendMessageMock, {
        "+491234567890": {
            "name": "Erika",
            "surname": "Mustermann",
            "company": "Mustermann GmbH"
        }
    })

    await handleNewCallEvent(testNewCallEvent);
    expect(number).toEqual("+491234567890");
    expect(name).toEqual("Erika");
    expect(surname).toEqual("Mustermann");
    expect(company).toEqual("Mustermann GmbH");
});

test("handleNewCallEvent sets parameter to unknown if number is not found in contacts", async () => {
    const testNewCallEvent = {
        callId: '',
        direction: 'in',
        event: 'newCall',
        from: '+491234567890',
        'fullUserId[]': ['123456789'],
        originalCallId: '',
        to: '49999999',
        'user[]': ['TestUser'],
        'userId[]': ['123456789'],
        xcid: '',
    }

    let number, name, surname, company;
    const sendMessageMock = jest.fn((label, data) => {
        number = data.number;
        name = data.name;
        surname = data.surname;
        company = data.company;
    });

    const handleNewCallEvent = createHandleNewCallEvent(sendMessageMock, {
        "+499999999999": {
            "name": "Erika",
            "surname": "Mustermann",
            "company": "Mustermann GmbH"
        }
    })

    await handleNewCallEvent(testNewCallEvent);
    expect(number).toEqual("+491234567890");
    expect(name).toEqual("unknown");
    expect(surname).toEqual("unknown");
    expect(company).toEqual("unknown");
});

test("handleHangUpEvent sends a message with label 'hangup' once", async () => {

    const testHangUpEvent = {
        event: "hangup",
        cause: "normalClearing",
        callId: "id_12345",
        from: "12345567",
        to: "4915791234567",
        direction: "in",
        answeringNumber: "12345678"
    }

    const historyClient = {
        getLatestHistoryEntry: () => {
            return {
                source: "12345567",
                target: "12345678",
                status: "PICKUP",
                recordingUrl: "https://static.sipgate.com/examples/wav/example.wav"
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

    await handleHangUpEvent(testHangUpEvent);
    expect(sendMessageMock).toHaveBeenCalledTimes(1);
});


