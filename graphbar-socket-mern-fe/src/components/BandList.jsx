import React, { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandList = () => {
	const { socket } = useContext(SocketContext);

	const [bands, setbands] = useState([]);

	useEffect(() => {
		socket.on('current-bands', (currentBands) => {
			setbands(currentBands);
		});
		return () => socket.off('current-bands');
	}, [socket]);

	const vote = (id) => {
		socket.emit('vote-band', id);
	};

	const eraseBand = (id) => {
		socket.emit('erase-band', id);
	};

	const changeBandName = (id, name) => {
		socket.emit('change-band-name', { id, name });
	};

	const changeName = (e, id) => {
		const newName = e.target.value;
		setbands((bands) =>
			bands.map((band) => {
				if (band.id === id) {
					band.name = newName;
				}
				return band;
			})
		);
	};

	const createRows = () => {
		return bands.map((band) => (
			<tr key={band.id}>
				<td>
					<button className='btn btn-primary' onClick={() => vote(band.id)}>
						+1
					</button>
				</td>
				<td>
					<input
						className='form-control'
						value={band.name}
						onChange={(event) => changeName(event, band.id)}
						onBlur={() => changeBandName(band.id, band.name)}
					/>
				</td>
				<td>
					<h3>{band.votes}</h3>
				</td>
				<td>
					<button className='btn btn-danger' onClick={() => eraseBand(band.id)}>
						Delete
					</button>
				</td>
			</tr>
		));
	};

	return (
		<>
			<table className='table table-stripped'>
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Votes</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>{createRows()}</tbody>
			</table>
		</>
	);
};

export default BandList;
