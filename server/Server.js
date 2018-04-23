var UserList = require('./UserList');

class Server {
	constructor(title, password, id) {
		this.title = title;
		if(password)
			this.password = password;
		else
			this.password = '';
		this.id = id;
		this.users = new UserList();
	}
	addUser(socket) {
		this.users.addUser(socket);
	}
	getUsers() {
		return this.users.getUsers();
	}
}

module.exports = Server;