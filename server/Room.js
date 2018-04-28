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
		return this.userList.getUserInfo();
	}
	getNumberOfUsers() {
		return this.userList.users.length;
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
				users.splice(x--, 1);
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
	updateColor(colorObject) {
		let users = this.userList.getUsers();
		for(var x=0;x<users.length;x++) {
			users[x].socket.emit('updateColor', [colorObject[0], colorObject[1]]);
		}
	}
	updateName(nameObject) {
		let users = this.userList.getUsers();
		for(var x=0;x<users.length;x++) {
			users[x].socket.emit('updateName', [nameObject[0], nameObject[1]]);
		}
	}
}

module.exports = Room;