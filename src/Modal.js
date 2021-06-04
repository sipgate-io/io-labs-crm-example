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
                <div
                    className={`modal-inner ${
                        !isActive ? 'modal-vibrating' : ''
                    }`}
                >
                    <h3>New Call</h3>
                    <p>{`Nummer: ${number}`}</p>
                    <p>
                        Name: {name} {surname}
                    </p>
                    <p>{`Company: ${company}`}</p>
                    {isActive ? (
                        <p>{`Duration: ${duration}s`}</p>
                    ) : (
                        <p>Ringing...</p>
                    )}
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
