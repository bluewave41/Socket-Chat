const uuidv4 = require('uuid/v4');

class User {
	constructor(socket) {
		this.socket = socket;
		this.id = uuidv4();
	}
	receieveUser(id) {
		this.socket.emit('receiveUser', id);
	}
}

module.exports = User;