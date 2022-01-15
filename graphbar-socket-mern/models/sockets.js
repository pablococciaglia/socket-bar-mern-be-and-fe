const BandList = require('./band-list');

class Sockets {
	constructor(io) {
		this.io = io;
		this.bandList = new BandList();
		this.socketEvents();
	}

	socketEvents() {
		// On connection
		this.io.on('connection', (socket) => {
			console.log('Client connected');

			// Emit to the client the current band list
			socket.emit('current-bands', this.bandList.getBands());

			// Listen to one vote
			socket.on('vote-band', (id) => {
				this.bandList.increaseVotes(id);

				// we can emit the event to the client or to the rest of the clients in two different lines
				// socket.emit('current-bands', this.bandList.getBands());
				// socket.broadcast.emit('current-bands', this.bandList.getBands());
				// Or in only one line
				this.io.emit('current-bands', this.bandList.getBands());
			});

			// Listen to erase a band
			socket.on('erase-band', (id) => {
				this.bandList.removeBand(id);
				this.io.emit('current-bands', this.bandList.getBands());
			});

			// Listen to add a band
			socket.on('add-band', ({ name }) => {
				this.bandList.addBand(name);
				this.io.emit('current-bands', this.bandList.getBands());
			});

			// Listen to change band name
			socket.on('change-band-name', ({ id, name }) => {
				this.bandList.changeBandName(id, name);
				this.io.emit('current-bands', this.bandList.getBands());
			});
		});
	}
}

module.exports = Sockets;
