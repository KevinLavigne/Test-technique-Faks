import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
	return (
		<div className="flex justify-between items-center h-[5vh] text-2xl px-4">
			<Link to="/">
				<img
					className="aspect-auto w-24"
					src="https://uploads-ssl.webflow.com/62baffdb2e8c87bb2a58b4f8/62de7fa105f534d0de9c8279_Faks_log_blue.svg"
				></img>
			</Link>
			<Link to="/">Home</Link>
			<Link to="/claim">New Claim</Link>
			<Link to="/user">User</Link>
		</div>
	);
}

export default NavBar;
