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

socket.on('newLocationMessage', function(message) {
    $('#messages').append(`<li>From ${message.from}: <a href=${message.url} target=_blank>My Location</a></li>`);
})


$('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val(),
    }, function() {

    })
})


const locationBtn = $('#send-location');

locationBtn.on('click', function() {
    console.log('btn click');

    if(!navigator.geolocation) {
        return alert('geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    });

});