import {EventEmitter} from 'events';

const emitter = new EventEmitter();

export const consumer = {
    listen: (callback) => {
        emitter.once('result', callback);
    },
}

export const producer = {
    notify: (data) => {
        emitter.emit('result', data);
    },
}
