import ffmpeg from 'fluent-ffmpeg';
import wav from 'wav';
import { Readable } from 'stream';
import * as vosk from 'vosk';
import { existsSync } from 'fs';
import {emitter} from "./webhookServer.js";

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

export const convertMp3ToWav = (path) => {
    //wfReader und wfReadable erstellen bei Aufruf
    const wfReader = new wav.Reader();
    const wfReadable = new Readable().wrap(wfReader);

    //on format für neu erstellten wfReader
    wfReader.on('format', async ({ sampleRate }) => {
        const rec = new vosk.Recognizer({ model: model, sampleRate: sampleRate });
        for await (const data of wfReadable) {
            const end_of_speech = await rec.acceptWaveformAsync(data);
            if (end_of_speech) {
                rec.acceptWaveform(data);
          }
        }
        let result = rec.finalResult().text;
        console.log(result);
        emitter.emit('result', result);

        rec.free();
    });

    ffmpeg(path)
        .audioFrequency(16000)
        .toFormat('wav')
        .on('error', (err) => {
            console.log(
                'An error occurred while converting the stream: ' + err.message
            );
        })
        .on('progress', (progress) => {
            console.log('Processing: ' + progress.targetSize + ' KB converted');
        })
        .on('end', () => {
            console.log('Processing finished !');
        }).pipe(wfReader);

}