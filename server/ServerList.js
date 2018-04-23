const Server = require('./Server');

class ServerList {
	constructor() {
		this.servers = [];
	}
	createServer(title, password, id) {
		this.servers.push(new Server(title, password, id));
	}
	getServers() {
		let servers = [];
		for(var x=0;x<this.servers.length;x++) {
			let server = this.servers[x];
			let password = 0;
			if(this.servers[x].password)
				password = 1;
			servers.push([server.title, password, server.id]);
		}
		return servers;
	}
	getServer(id) {
		for(var x=0;x<this.servers.length;x++) {
			if(this.servers[x].id == id) {
				return this.servers[x];
			}
		}
	}
}

module.exports = ServerList;