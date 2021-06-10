import {Modal} from './components/Modal';
import {Header} from './components/Header';
import {VoicemailTable} from './components/VoicemailTable';
import React, {useEffect, useState} from 'react';

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
    const [voicemails, setVoicemails] = useState([]);

    useEffect(() => {
        ioClient.on('incoming', (callInfo) =>
            setState({...state, ...callInfo, callStatus: callStatus.RINGING})
        );
        ioClient.on('answer', () =>
            setState({...state, callStatus: callStatus.ACTIVE})
        );
        ioClient.on('hangup', () => setState(initialState));
        ioClient.on('voicemail', (voiceMail) => {
            setVoicemails([...voicemails, voiceMail]);
        });
    });

    return (
        <div className="App">
            <Header/>
            {state.callStatus === callStatus.NONE ? (
                <div style={{textAlign: 'center', marginTop: '2em'}}>
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
                <VoicemailTable voicemails={voicemails} />
            </div>
        </div>
    );
}

export default App;
