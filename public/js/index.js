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
    let messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val(),
    }, function() {
        messageTextBox.val('');
    })
})


const locationBtn = $('#send-location');

locationBtn.on('click', function() {

    if(!navigator.geolocation) {
        return alert('geolocation not supported by your browser.');
    }

    locationBtn.attr('disabled', 'disabled').text('Sending Location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
        locationBtn.removeAttr('disabled').text('Send Location');
    });
});