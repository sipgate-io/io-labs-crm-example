import {Modal} from './Modal';
import {Header} from './Header';
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
        voiceMails: new Array(),
    };
    const [state, setState] = useState(initialState);

    useEffect(() => {
        ioClient.on('incoming', (callInfo) =>
            setState({...callInfo, callStatus: callStatus.RINGING})
        );
        ioClient.on('answer', () =>
            setState({...state, callStatus: callStatus.ACTIVE})
        );
        ioClient.on('hangup', () => setState(initialState));
        ioClient.on('voicemail', (voiceMail) => {
            setState({...state, voiceMails: [].concat(voiceMail)});
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
            <div>
                <span>Voicemails: {JSON.stringify(state.voiceMails)}</span>
            </div>
        </div>
    );
}

export default App;
