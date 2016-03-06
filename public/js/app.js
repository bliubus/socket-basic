var socket = io();

socket.on('connect', function() {
	console.log('Connected to socket.io server');
});

socket.on('message', function(message) {
	console.log('New message:');
	console.log(message.text);
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function(event) {
	event.preventDefault(); // don't want submit old fashion way by refreshing whole page

	var $message = $form.find('input[name=message]');
	socket.emit('message', {
		text: $message .val()
	});

	$message.val("");
});