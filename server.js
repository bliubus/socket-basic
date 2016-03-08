var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');
var clientInfo = {};

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
	console.log('User connected via socket.io');
	
	socket.on('disconnect', function() {
		var userData = clientInfo[socket.id];
		console.log('disconnecting...' + userData.room);
		console.log('disconnecting...' + typeof userData);
		if (typeof userData !== 'undefined') {
			socket.leave(userData);
			socket.broadcast.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left.',
				timestamp: moment().valueOf()
			});

			delete clientInfo[socket.id];
		}
	});

	socket.on('joinRoom', function(req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);

		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});

	socket.on('message', function(message) {
		console.log('Message received: ' + message.text);
		message.timestamp = moment().valueOf(); // millis
		// socket.broadcast.emit('message', message); // send to everybody but the sender
		io.to(clientInfo[socket.id].room).emit('message', message); // send the reply to everybody including the sender
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