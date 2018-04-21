var socket;

$(document).ready(function() {
	loadView('main.html');
	socket = io('http://localhost:5555');
	socket.on('connect', function() {
		console.log('connected');
	});
});

function loadView(name) {
	$.post('http://localhost/chat/views/'+name, function(view) {
		$('body').html(view);
	});
}