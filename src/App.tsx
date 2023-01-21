import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Claim from './pages/Claim';
import NewClaim from './pages/NewClaim';
import User from './pages/User';
import NavBar from './components/navbar';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/claim/:id" element={<Claim />} />
				<Route path="/page2" element={<NewClaim />} />
				<Route path="/page3" element={<User />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
