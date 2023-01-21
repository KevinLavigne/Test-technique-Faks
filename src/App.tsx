import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Claim from './pages/Claim';
import NewClaim from './pages/NewClaim';
import User from './pages/User';
import NavBar from './components/navbar';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/claim/:id" element={<Claim />} />
				<Route path="/claim" element={<NewClaim />} />
				<Route path="/user" element={<User />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
