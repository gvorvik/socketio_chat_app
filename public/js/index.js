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
    $('#messages').append(`<li>From ${message.from}: ${message.text}</li>`);
});

$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val(),
    }, function() {

    })
})