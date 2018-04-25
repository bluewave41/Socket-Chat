var UserList = require('./UserList');

class Room {
	constructor(title, password, id) {
		this.title = title;
		if(password)
			this.password = password;
		else
			this.password = '';
		this.id = id;
		this.userList = new UserList();
	}
	addUser(socket) {
		let user = this.userList.addUser(socket);
		this.updateUsers(user.id);
		return user;
	}
	getUsers() {
		return this.userList.getUserIDs();
	}
	updateUsers(id) {
		let users = this.userList.getUsers();
		for(var x=0;x<users.length;x++) {
			users[x].socket.emit('receiveUser', id);
		}
	}
	userLeft(id) {
		let users = this.userList.getUsers();
		for(var x=0;x<users.length;x++) {
			if(users[x].id == id) {
				users = users.splice(x--, 1);
			}
			else
				users[x].socket.emit('userLeft', id);
		}
	}
	updateTextForAllExceptSender(userObject) {
		let users = this.userList.getUsers();
		for(var x=0;x<users.length;x++) {
			if(users[x].id != userObject[0]) {
				users[x].socket.emit('updateText', [userObject[0], userObject[1]]);
			}
		}
	}
}

module.exports = Room;