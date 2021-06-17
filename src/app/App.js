import { Modal } from './components/Modal';
import { Header } from './components/Header';
import { VoicemailTable } from './components/VoicemailTable';
import React, { useEffect, useState } from 'react';

import io from 'socket.io-client';

const ioClient = io.connect('http://localhost:8090');

const callStatus = {
    NONE: 'none',
    RINGING: 'ringing',
    ACTIVE: 'active',
};

function App() {
    const initialState = {
        number: 'unknown',
        name: 'unknown',
        surname: 'unknown',
        company: 'unknown',
        callStatus: callStatus.NONE,
    };

    const [state, setState] = useState(initialState);
    const [voicemails, setVoicemails] = useState(
        localStorage.getItem('voicemails')
            ? JSON.parse(localStorage.getItem('voicemails'))
            : []
    );

    useEffect(() => {
        ioClient.on('incoming', (callInfo) =>
            setState({ ...state, ...callInfo, callStatus: callStatus.RINGING })
        );
        ioClient.on('answer', () =>
            setState({ ...state, callStatus: callStatus.ACTIVE })
        );
        ioClient.on('hangup', () => setState(initialState));
        ioClient.on('voicemail', (voiceMail) => {
            setVoicemails(
                [...voicemails, { ...voiceMail, showText: true }],
                () => {}
            );
            localStorage.setItem(
                'voicemails',
                JSON.stringify([...voicemails, voiceMail])
            );
        });
    });

    const deleteVoicemail = (index) => {
        voicemails.splice(index, 1);
        setVoicemails([...voicemails]);
        localStorage.setItem('voicemails', JSON.stringify([...voicemails]));
    };

    const hideText = (index) => {
        setVoicemails([
            ...voicemails.slice(0, index),
            { ...voicemails[index], showText: !voicemails[index].showText },
            ...voicemails.slice(index + 1, voicemails.length + 1),
        ]);
    };

    return (
        <div className="App">
            <Header />
            {state.callStatus === callStatus.NONE ? (
                <div style={{ textAlign: 'center', marginTop: '2em' }}>
                    <h1>📞 No Call 📞</h1>
                </div>
            ) : (
                <Modal
                    name={state.name}
                    surname={state.surname}
                    company={state.company}
                    number={state.number}
                    isActive={state.callStatus === callStatus.ACTIVE}
                />
            )}
            <div className="voicemailTableContainer">
                <VoicemailTable
                    voicemails={voicemails}
                    deleteVoicemail={deleteVoicemail}
                    hideText={hideText}
                />
            </div>
        </div>
    );
}

export default App;
