import ffmpeg from 'fluent-ffmpeg';
import {wfReader} from './voskAPI.js';

export const convertMp3ToWav = (path) => ffmpeg(path)
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
