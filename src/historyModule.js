import { createHistoryModule, sipgateIO } from 'sipgateio';
import * as dot from 'dotenv';
import { promisify } from 'util';

const setTimeoutPromise = promisify(setTimeout);

dot.config();

const sipgateTokenID = process.env.SIPGATE_TOKEN_ID;
const sipgateToken = process.env.SIPGATE_TOKEN;
const client = sipgateIO({ tokenId: sipgateTokenID, token: sipgateToken });
const historyModule = createHistoryModule(client);

export async function getLatestHistoryEntry() {
    await setTimeoutPromise(7000);
    const historyEntries = await historyModule.fetchAll(
        {},
        {
            limit: 1,
        }
    );
    return historyEntries[0];
}
