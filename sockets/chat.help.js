"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupChat = setupChat;
let activeUsers = 0;
function setupChat(io) {
    io.on('connection', (socket) => {
        console.log(`A user connected with ID: ${socket.id}`);
        activeUsers++;
        console.log(activeUsers, 'active users');
        io.emit('active-users', activeUsers);
        socket.on('new-user-joined', (name) => {
            console.log(`${name} has joined the chat`);
            socket.name = name;
            socket.broadcast.emit('user-joined', name);
        });
        socket.on('send', ({ message, name }) => {
            console.log(`Message from ${name}: ${message}`);
            socket.broadcast.emit('received', { message, name });
        });
        socket.on('disconnect', () => {
            if (socket.name) {
                activeUsers--;
                io.emit('active-users', activeUsers);
                socket.broadcast.emit('left', socket.name);
                console.log(`${socket.name} has left the chat`);
            }
        });
    });
}
