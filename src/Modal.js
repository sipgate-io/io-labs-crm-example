import { useState, useEffect } from "react";
import './Modal.css';

export const Modal = ({number, name, isActive=false}) => {
    const [duration, setDuration] = useState(0);
    useEffect(() => {
        let interval;
        if(isActive) {
            interval = setInterval(() => {
                setDuration(duration + 1);
              }, 1000);
        }
        
        return () => clearInterval(interval);
    })

    return (
        <div className="container">
            <div className="modal">
                <div className="modal-inner">
                    <h3>Neuer Anruf</h3>
                    <p>Nummer: {number}</p>
                    <p>Name: {name}</p>
                    {isActive ? <p>{duration}</p> : <p>Ringing...</p>}
                </div>
            </div>            
        </div>);
}