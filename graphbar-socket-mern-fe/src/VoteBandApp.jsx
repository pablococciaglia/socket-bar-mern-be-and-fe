import React from 'react';
import SocketProvider from './context/SocketContext';
import HomePage from './pages/HomePage';

const VoteBandApp = () => {
	return (
		<SocketProvider>
			<HomePage />
		</SocketProvider>
	);
};

export default VoteBandApp;
