var socket;

$(document).ready(function() {
	socket = io('http://localhost:5555');
	loadView('main.html');
	socket.on('connect', function() {
		$('#status').text('Connected');
		$('.disconnected').removeClass('disconnected').addClass('connected');
	});
	socket.on('disconnect', function() {
		$('#status').text('Not connected');
		$('.connected').removeClass('connected').addClass('disconnected');
	});
});

function loadView(name) {
	$.post('http://localhost/chat/views/'+name, function(view) {
		$('#content').html(view);
	});
}