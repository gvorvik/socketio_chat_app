let socket = io();

function scrollToBottom() {
    //Selectors
    const messages = $('#messages');
    const newMessage = messages.children('li:last-child')
    //Heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }
}

        
//fires when server connects
socket.on('connect', function() {
    const params = $.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if(err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('no error');
        }
    });
});

//fires when server disconnects
socket.on('disconnect', function() {
    console.log('server disconnected');
});

socket.on('updateUserList', function(users) {
    let ol = $('<ol></ol>');
    users.forEach(function(user) {
        console.log(user);
        ol.append($(`<li>${user}</li>`));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function(message) {
    let template = $('#message-template').html();
    const formattedTime = moment(message.createdAt).format('h:mm a');

    //takes 2 arguments - the template and the data for the template
    let html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom();
    // $('#messages').append(`<li>From ${message.from} ${formattedTime}: ${message.text}</li>`);
});

socket.on('newLocationMessage', function(message) {
    let template = $("#location-message-template").html()
    const formattedTime = moment(message.createdAt).format('h:mm a');
    let html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    $('#messages').append(html);
    scrollToBottom()
    // $('#messages').append(`<li>From ${message.from} ${formattedTime}: <a href=${message.url} target=_blank>My Location</a></li>`);
})


$('#message-form').on('submit', function(e) {
    e.preventDefault();
    let messageTextBox = $('[name=message]');

    socket.emit('createMessage', {
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