const Band = require('./band');
class BandList {
	constructor() {
		this.bands = [
			new Band('Sumo'),
			new Band('Soda Stereo'),
			new Band('Las Pelotas'),
			new Band('Bersuit Vergarabat'),
		];
	}

	addBand(name) {
		const newBand = new Band(name);
		this.bands.push(newBand);
		return this.bands;
	}

	removeBand(bandId) {
		this.bands = this.bands.filter(({ id }) => id !== bandId);
	}

	getBands() {
		return this.bands;
	}

	increaseVotes(id) {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.votes += 1;
			}
			return band;
		});
	}

	changeBandName(id, newName) {
		this.bands = this.bands.map((band) => {
			if (band.id === id) {
				band.name = newName;
			}
			return band;
		});
	}
}

module.exports = BandList;
