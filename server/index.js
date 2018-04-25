var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var RoomList = require('./RoomList');
var stdin = process.openStdin();
const uuidv4 = require('uuid/v4');

stdin.addListener("data", function(d) {
	try {
		eval(d.toString());
	}
	catch(e) {
		console.log(e);
	}
});

var rooms = new RoomList();

io.on('connection', function(socket) {
	socket.on('disconnect', function() {
		if(socket.room)
			socket.room.userLeft(socket.user.id);
	});
	socket.on('createServer', function(serverObject) {
		let title = serverObject.title;
		let password = serverObject.password;
		let id  = uuidv4();
		rooms.createRoom(title, password, id);
	});
	socket.on('getServers', function() {
		console.log('got servers');
		socket.emit('serverList', rooms.getRooms());
	});
	socket.on('joinServer', function(id) {
		let room = rooms.getRoom(id);
		let user = room.addUser(socket);
		socket.room = room;
		socket.user = user;
		socket.emit('userID', user.id);
	});
	socket.on('getUsers', function() {
		socket.emit('users', socket.room.getUsers());
	});
	socket.on('updateText', function(userObject) {
		socket.room.updateTextForAllExceptSender(userObject);
	});
});

http.listen(5555, function() {
	console.log('listening on *:5555');
});