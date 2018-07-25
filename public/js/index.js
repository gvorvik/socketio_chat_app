let socket = io();
        
//fires when server connects
socket.on('connect', function() {
    console.log('connected to server');
});

//fires when server disconnects
socket.on('disconnect', function() {
    console.log('server disconnected');
});

socket.on('newMessage', function(message) {
    console.log('new message arrived', message);
});