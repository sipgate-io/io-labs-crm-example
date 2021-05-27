import {Modal} from "./Modal";
import {Header} from "./Header";
import {useEffect, useState} from "react";

import io from 'socket.io-client';
const ioClient = io.connect("http://localhost:8090");

const callStatus = {
    "NONE": "none",
    "RINGING": "ringing",
    "ACTIVE": "active"
}
function App() {
    const initialState = {number: "", name: "", surname: "", company: "", callStatus: callStatus.NONE};
    const [state, setState] = useState(initialState);

    useEffect(() => {
        ioClient.on("incoming", (callInfo) => setState({...callInfo, callStatus: callStatus.RINGING}));
        ioClient.on("answer", () => setState({...state, callStatus: callStatus.ACTIVE}))
        ioClient.on("hangup", () => setState(initialState));
    })

    return (
        <div className="App">
            <Header />
            {state.callStatus === callStatus.NONE ? <div style={{textAlign: 'center', marginTop: '2em'}}><p>No Call</p></div> :
            <Modal name={state.name} surname={state.surname} company={state.company} number={state.number} isActive={state.callStatus === callStatus.ACTIVE} /> }
        </div>
    );
}

export default App;
