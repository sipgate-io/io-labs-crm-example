import { useState, useEffect } from 'react';
import './Modal.css';
import PropTypes from 'prop-types';
import React from 'react';
export const Modal = ({ number, name, surname, company, isActive = false }) => {
    const [duration, setDuration] = useState(0);
    console.log(number);
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                setDuration(duration + 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    });

    return (
        <div className="container">
            <div className="modal">
                <div className="modal-inner modal-vibrating">
                    <div className="">
                        <h3>New Call</h3>
                        <p>{number === '' ? null : `Nummer: ${number}`}</p>
                        <p>
                            Name: {name} {surname}
                        </p>
                        <p>{company === '' ? null : `Company: ${company}`}</p>
                        {isActive ? <p>{duration}</p> : <p>Ringing...</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
};

Modal.defaultProps = {
    isActive: false,
};
