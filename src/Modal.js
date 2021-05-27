import { useState, useEffect } from "react";
import './Modal.css';

export const Modal = ({number, name, surname, company, isActive=false}) => {
    const [duration, setDuration] = useState(0);
    console.log(number);
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
                    <p>{number === "" ? null : `Nummer: ${number}`}</p>
                    <p>Name: {name} {surname}</p>
                    <p>{company === "" ? null : `Company: ${company}`}</p>
                    {isActive ? <p>{duration}</p> : <p>Ringing...</p>}
                </div>
            </div>            
        </div>);
}