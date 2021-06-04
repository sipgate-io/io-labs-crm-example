import ffmpeg from 'fluent-ffmpeg'
import https from 'https'
import { wfReader } from "./voskAPI.js";

const request = https.get("https://secure.live.sipgate.de/download/e2b7d0163cdf705d4f3002a0be8a93cc/voicemail-20210604111854.mp3", function (response) {
    ffmpeg(response)
        .audioFrequency(16000)
        .toFormat('wav')
        .on('error', (err) => {
            console.log('An error occurred: ' + err.message);
        })
        .on('progress', (progress) => {
            console.log('Processing: ' + progress.targetSize + ' KB converted');
        })
        .on('end', () => {
            console.log('Processing finished !');
        })
        .pipe(wfReader);
});