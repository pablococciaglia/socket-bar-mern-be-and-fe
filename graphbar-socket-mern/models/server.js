// Servidor de Express
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;

		// Http server
		this.server = http.createServer(this.app);

		// Configuraciones de sockets
		this.io = socketio(this.server, {
			/* configurations */
		});
	}

	middlewares() {
		// Deploy public directory
		this.app.use(express.static(path.resolve(__dirname, '../public')));

		// CORS
		this.app.use(cors());
	}

	// Could be here or like a Class property
	configurarSockets() {
		new Sockets(this.io);
	}

	execute() {
		// Middlewares initialization
		this.middlewares();

		// Sockets initialization
		this.configurarSockets();

		// Server initialization
		this.server.listen(this.port, () => {
			console.log('Server in port:', this.port);
		});
	}
}

module.exports = Server;
