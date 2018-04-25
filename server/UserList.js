const User = require('./User');

class UserList {
	constructor() {
		this.users = [];
	}
	addUser(socket) {
		let user = new User(socket);
		this.users.push(user);
		return user;
	}
	getUserIDs() {
		let users = [];
		for(var x=0;x<this.users.length;x++) {
			users.push(this.users[x].id);
		}
		return users;
	}
	getUsers() {
		return this.users;
	}
}

module.exports = UserList;