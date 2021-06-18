import { EventEmitter } from 'events';

const emitter = new EventEmitter();

export const consumer = {
    listen: (type, callback) => {
        emitter.once(type, callback);
    },
};

export const producer = {
    notify: (type, data) => {
        emitter.emit(type, data);
    },
};
