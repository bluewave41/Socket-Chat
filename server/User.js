const uuidv4 = require('uuid/v4');

class User {
	constructor(socket) {
		this.socket = socket;
		this.color = '#000000';
		this.name = 'Default';
		this.id = uuidv4();
	}
	safeInfo() {
		return {
			color: this.color,
			name: this.name,
			id: this.id
		};
	}
	receieveUser(id) {
		this.socket.emit('receiveUser', id);
	}
}

module.exports = User;