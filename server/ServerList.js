const Server = require('./Server');

class ServerList {
	constructor() {
		this.servers = [];
	}
	createServer(title, password) {
		this.servers.push(new Server(title, password));
	}
	getServers() {
		let servers = [];
		for(var x=0;x<this.servers.length;x++) {
			let password = 0;
			if(this.servers[x].password)
				password = 1;
			servers.push([this.servers[x].title, password]);
		}
		return servers;
	}
}

module.exports = ServerList;