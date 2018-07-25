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

io.on('connection', (socket) => {
    console.log('new user connected');

    socket.on('disconnect', () => {
        console.log('disconnected from user');
    })
});

server.listen(PORT, () => {
    console.log(`App listening at port ${PORT}`);
});
