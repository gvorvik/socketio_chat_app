const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');

const publicPath = path.join(__dirname, '../public');

const PORT = process.env.PORT || 5000;

app.use(express.static(publicPath));

//fires on connection with client
io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            callback('Name and room name are required!')
        }

        socket.join(params.room);

        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

        callback();
    })

    //listens for event from client
    socket.on('createMessage', (message, callback) => {
        //emits event to every connection
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback();

    });

    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('God', coords.latitude, coords.longitude))
    })

    //fires on disconnection from client
    socket.on('disconnect', () => {
        console.log('disconnected from user');
    })
});

server.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
