const uuidv4 = require('uuid/v4');

class User {
	constructor(socket) {
		this.socket = socket;
		this.id = uuidv4();
	}
}

module.exports = User;