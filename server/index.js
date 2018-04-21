var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ServerList = require('./ServerList');
var stdin = process.openStdin();

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
		servers.createServer(title, password);
	});
	socket.on('getServers', function() {
		socket.emit('serverList', servers.getServers());
	});
});

http.listen(5555, function() {
	console.log('listening on *:5555');
});