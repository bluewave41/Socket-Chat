const Room = require('./Room');

class RoomList {
	constructor() {
		this.rooms = [];
	}
	createRoom(title, password, id) {
		this.rooms.push(new Room(title, password, id));
	}
	getRooms() {
		let rooms = [];
		for(var x=0;x<this.rooms.length;x++) {
			let room = this.rooms[x];
			let password = 0;
			if(this.rooms[x].password)
				password = 1;
			rooms.push({
				title: room.title,
				password: password,
				id: room.id,
				numberOfUsers: room.getNumberOfUsers()
			});
		}
		return rooms;
	}
	getRoom(id) {
		for(var x=0;x<this.rooms.length;x++) {
			if(this.rooms[x].id == id) {
				return this.rooms[x];
			}
		}
	}
}

module.exports = RoomList;