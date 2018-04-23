var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ServerList = require('./ServerList');
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

var servers = new ServerList();

io.on('connection', function(socket) {
	socket.on('createServer', function(serverObject) {
		let title = serverObject.title;
		let password = serverObject.password;
		let id  = uuidv4();
		servers.createServer(title, password, id);
	});
	socket.on('getServers', function() {
		socket.emit('serverList', servers.getServers());
	});
	socket.on('joinServer', function(id) {
		let server = servers.getServer(id);
		server.addUser(socket);
		socket.server = server;
	});
	socket.on('getUsers', function() {
		socket.emit('users', socket.server.getUsers());
	});
});

http.listen(5555, function() {
	console.log('listening on *:5555');
});