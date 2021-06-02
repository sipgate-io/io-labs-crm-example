import { HistoryEntryType, sipgateIO, createHistoryModule } from 'sipgateio';
import * as dot from 'dotenv';
dot.config();

const sipgateTokenID = process.env.SIPGATE_TOKEN_ID;
const sipgateToken   = process.env.SIPGATE_TOKEN;
const client         = sipgateIO({tokenId: sipgateTokenID, token: sipgateToken});
const historyModule  = createHistoryModule(client);

export function getVoiceMailEvent(date, caller, callee){
    // {startDate: date, types: [HistoryEntryType.VOICEMAIL]}
    return historyModule.fetchAll({startDate: new Date('2021-06-02T14:02:30.018Z'), types: [HistoryEntryType.VOICEMAIL]}).then(historyEvents => {
        console.log(date, caller, callee, historyEvents);
        return historyEvents.find((entry) => {console.log(entry); return entry.source === caller && entry.target === callee;})
    });
}


