var socket;

$(document).ready(function() {
	socket = io('http://localhost:5555');
	loadView('main.html');
	socket.on('connect', function() {
		console.log('connected');
	});
});

function loadView(name) {
	$.post('http://localhost/chat/views/'+name, function(view) {
		$('body').html(view);
	});
}