import { readFileSync } from 'fs';

export function getContacts() {
    let contactsData;
    try {
        contactsData = readFileSync('contacts.json');
    } catch (error) {
        console.log(
            'ERROR: Please provide a contacts.json file in the root directory. More information can be obtained in the README.md'
        );
        throw error;
    }
    return JSON.parse(contactsData);
}
