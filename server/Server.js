class Server {
	constructor(title, password) {
		this.title = title;
		if(password)
			this.password = password;
		else
			this.password = '';
	}
}

module.exports = Server;