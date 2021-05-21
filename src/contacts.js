import {promisify} from "util";
import {readFile} from "fs";

const readContactsFile = promisify(readFile);

export async function getContacts() {
    const contactsData = await readContactsFile("contacts.json");
    return JSON.parse(contactsData);
}
