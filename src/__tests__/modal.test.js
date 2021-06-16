import renderer from 'react-test-renderer';
import React from 'react';
import { Modal } from '../components/Modal';

it('it renders the Modal without data', () => {
    const tree = renderer
        .create(<Modal
            name={""}
            surname={""}
            company={""}
            number={""}
            isActive={false}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('it renders the Modal with exampledata', () => {
    const tree = renderer
        .create(<Modal
            name={"Peterle"}
            surname={"Drobush"}
            company={"Peterles Company"}
            number={"123456789"}
            isActive={false}
        />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});