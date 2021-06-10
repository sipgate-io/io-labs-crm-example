import React from 'react';
import PropTypes from 'prop-types';
import './VoicemailTable.css';

export const VoicemailTable = ({ voicemails, deleteVoicemail }) => {
    const renderContent = () => {
        if (voicemails.length > 0) {
            return voicemails.map((voicemail, index) => {
                return (
                    <tr key={index}>
                        <td>{voicemail.number}</td>
                        <td>{voicemail.text}</td>
                        <td>{voicemail.duration} seconds</td>
                        <td>
                            {
                                <button onClick={() => deleteVoicemail(index)}>
                                    remove
                                </button>
                            }
                        </td>
                    </tr>
                );
            });
        }

        return (
            <tr>
                <td colSpan={3}>There is no entry</td>
            </tr>
        );
    };

    return (
        <div className="voicemailContainer">
            <h2>Voicemails</h2>
            <table className="voicemailTable">
                <colgroup>
                    <col className="numberColumn" />
                    <col />
                    <col className="durationColumn" />
                    <col className="removeColumn" />
                </colgroup>
                <tr>
                    <th>Number</th>
                    <th>Text</th>
                    <th>Duration</th>
                    <th></th>
                </tr>
                {renderContent()}
            </table>
        </div>
    );
};

VoicemailTable.propTypes = {
    voicemails: PropTypes.array,
    deleteVoicemail: PropTypes.func,
};
