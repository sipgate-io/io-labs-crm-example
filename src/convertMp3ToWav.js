import ffmpeg from 'fluent-ffmpeg'

let track = './voicemail.mp3';

ffmpeg(track)
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
    .save('./voicemail.wav');