import {HistoryEntryType, sipgateIO, createHistoryModule} from 'sipgateio';
import * as dot from 'dotenv';
import {promisify} from 'util';

const setTimeoutPromise = promisify(setTimeout);

dot.config();

const sipgateTokenID = process.env.SIPGATE_TOKEN_ID;
const sipgateToken = process.env.SIPGATE_TOKEN;
const client = sipgateIO({tokenId: sipgateTokenID, token: sipgateToken});
const historyModule = createHistoryModule(client);

export async function getVoiceMailEvent(caller, callee) {
    const startdate = new Date('2021-06-02T14:00:00Z');
    await setTimeoutPromise(10000);
    const voiceMails = historyModule.fetchAll({
        startDate: startdate,
        types: [HistoryEntryType.VOICEMAIL]
    });
    // .then(historyEvents => {
    //     console.log(startdate, caller, callee, historyEvents);
    //     return historyEvents.find((entry) => {
    //         console.log(entry);
    //         return entry.source === caller && entry.target === callee;
    //     })
    // });

    return voiceMails;
}


