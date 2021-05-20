import {useEffect} from "react";

const io = require('socket.io-client');
const ioClient = io.connect("http://localhost:8090");

export const Modal = ({number, name}) => {
    useEffect(() => {
        ioClient.on("test", (msg) => console.log(msg));
    })
    return (
        <div>
            <p>Nummer: {number}</p>
            <p>Name: {name}</p>
        </div>);
}