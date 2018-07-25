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

    //creates event - first argument must match the client side argument
    socket.emit('newMessage', {
        text: 'Hello this is a message from Greg!',
        sentFrom: 'Greg',
        sentAt: '3:00 p.m.'
    });

    //listens for event from client
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });

    //fires on disconnection from client
    socket.on('disconnect', () => {
        console.log('disconnected from user');
    })
});

server.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
