import React, { useState, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';

const BandAdd = () => {
	const { socket } = useContext(SocketContext);
	const [newBand, setNewBand] = useState('');

	const onChange = (e) => {
		setNewBand(e);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (newBand.length > 0) {
			socket.emit('add-band', { name: newBand });
			setNewBand('');
		}
	};

	return (
		<>
			<h3>Add Band</h3>
			<hr />
			<form onSubmit={onSubmit}>
				<input
					className='form-control'
					placeholder='New band name'
					value={newBand}
					onChange={(e) => {
						onChange(e.target.value);
					}}
				/>
			</form>
		</>
	);
};

export default BandAdd;
