const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');

const PORT = process.env.PORT || 5000;

app.use(express.static(publicPath));

//fires on connection with client
io.on('connection', (socket) => {
    console.log('new user connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat room',
        createdAt: new Date().getTime()
    });

    //sends event to everyone but this socket
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user in chat room',
        createdAt: new Date().getTime()
    });

    //listens for event from client
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);

        //emits event to every connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });

    });

    //fires on disconnection from client
    socket.on('disconnect', () => {
        console.log('disconnected from user');
    })
});

server.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
