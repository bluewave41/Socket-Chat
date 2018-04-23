const User = require('./User');

class UserList {
	constructor() {
		this.users = [];
	}
	addUser(socket) {
		this.users.push(new User(socket));
	}
	getUsers() {
		let users = [];
		for(var x=0;x<this.users.length;x++) {
			users.push(this.users[x].id);
		}
		return users;
	}
}

module.exports = UserList;