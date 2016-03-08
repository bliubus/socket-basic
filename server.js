var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('User connected via socket.io');
	var now = moment();

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);
		message.timestamp = moment().valueOf(); // millis
		// socket.broadcast.emit('message', message); // send to everybody but the sender
		io.emit('message', message); // send the reply to everybody including the sender
	});

	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application!',
		timestamp: moment().valueOf()
	})
});

http.listen(PORT, function() {
	console.log('Server started');
});