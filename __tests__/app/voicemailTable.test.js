import renderer from 'react-test-renderer';
import React from 'react';
import { VoicemailTable } from '../../src/app/components/VoicemailTable';

it('it renders VoicemailTable without data', () => {
    const tree = renderer
        .create(<VoicemailTable
            voicemails={[]}
            deleteVoicemail={() => {}}
            hideText={() => {}}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('it renders VoicemailTable with example data', () => {
    const tree = renderer
        .create(<VoicemailTable
            voicemails={[{number: 'unknown', text: "Test 1", duration: 25}]}
            deleteVoicemail={() => {}}
            hideText={() => {}}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
