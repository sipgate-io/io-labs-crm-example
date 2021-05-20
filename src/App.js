import {Modal} from "./Modal";
import {useEffect, useState} from "react";

const io = require('socket.io-client');
const ioClient = io.connect("http://localhost:8090");

function App() {
    const initialState = {number: "", name: "", isCall: false};
    const [state, setState] = useState(initialState);

    useEffect(() => {
        ioClient.on("incoming", (callInfo) => setState({...callInfo, isCall: true}));
        ioClient.on("hangup", () => setState(initialState));
    })
    return (
        <div className="App">
            {state.isCall?
                <Modal number={state.number} name={state.name} />: <p>No Call</p>
            }
        </div>
    );
}

export default App;
