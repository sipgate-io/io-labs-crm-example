import ffmpeg from 'fluent-ffmpeg';
import https from 'https';
import { wfReader } from './voskAPI.js';

const convertMp3ToWav = (stream) =>
    ffmpeg(stream)
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
        });

export const convertUrl = (url) => {
    https.get(url, (response) => {
        convertMp3ToWav(response).pipe(wfReader);
    });
};
