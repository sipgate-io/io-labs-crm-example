import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

export const VoicemailTable = ({ voicemails }) => {
    return (
        <div className="voicemailContainer">
            <h2>Voicemails</h2>
            <table className="voicemailTable">
                <thead>
                    <tr>
                        <th>Number</th>
                        <th>Text</th>
                        <th>Duration</th>
                    </tr>
                </thead>
                <tbody>
                    {voicemails.map((voicemail, index) => {
                        return (
                            <tr key={index}>
                                <td>{voicemail.number}</td>
                                <td>{voicemail.text}</td>
                                <td>{voicemail.duration} seconds</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

VoicemailTable.propTypes = {
    voicemails: PropTypes.array,
};
