import {handleNewCallEvent} from "../../webhookServer.js";

test('does nothing', async () => {
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

    const mockEmitter = jest.fn(() => {});
    await handleNewCallEvent(testNewCallEvent, mockEmitter);
    expect(mockEmitter).toHaveBeenCalledTimes(1);
})