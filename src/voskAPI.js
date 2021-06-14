import * as vosk from 'vosk';
import { existsSync } from 'fs';
import { Readable } from 'stream';
import { Reader } from 'wav';
import { emitter } from './webhookServer.js';

const MODEL_PATH = 'model';
if (!existsSync(MODEL_PATH)) {
    console.log(
        'Please download the model from https://alphacephei.com/vosk/models and unpack as ' +
            MODEL_PATH +
            ' in the current folder.'
    );
    process.exit();
}

vosk.setLogLevel(0);
const model = new vosk.Model(MODEL_PATH);

export const getWfReader = () => {
    const wfReader = new Reader();
    const wfReadable = new Readable().wrap(wfReader);

    wfReader.on('format', async ({ sampleRate }) => {
        const rec = new vosk.Recognizer({
            model: model,
            sampleRate: sampleRate,
        });
        for await (const data of wfReadable) {
            rec.acceptWaveform(data);
        }
        emitter.emit('result', rec.finalResult().text);
        rec.free();
    });
    return wfReader;
};
