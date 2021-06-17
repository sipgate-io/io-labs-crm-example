import {createServer} from 'http';
import {Server} from 'socket.io';

export function initSocketServer() {
    const httpServer = createServer();
    const io = new Server(httpServer, {
        cors: {
            origin: 'http://localhost:3000',
        },
    });

    httpServer.listen(8090);
    return io.on('connection', (socket) => socket);
}

export const createSendSocketMessage = (socketServer) => {
    return (label, data) => {
        socketServer.emit(label, data);
    };
}