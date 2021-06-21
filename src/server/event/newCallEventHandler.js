export const createHandleNewCallEvent = (sendMessage, contacts) => {
    return (newCallEvent) => {
        try {
            let number = newCallEvent.from;
            let name = 'unknown';
            let surname = 'unknown';
            let company = 'unknown';
            let ringing = true;

            if (contacts[number]) {
                name = contacts[number].name;
                surname = contacts[number].surname;
                company = contacts[number].company;
            }

            if (newCallEvent.users[0] === 'voicemail') {
                ringing = false;
            }

            sendMessage('incoming', {
                number: number,
                name: name,
                surname: surname,
                company: company,
                ringing: ringing,
            });
        } catch (error) {
            console.error(error.message);
        }

        console.log(`New call from ${newCallEvent.from} to ${newCallEvent.to}`);
    };
};
