import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import styles from './App.module.css'
import Navbar from './components/Navbar';
import Home from './pages/Main/Home/Home';
import Login from './pages/Login/Login';
import CreatePost from './pages/CreatePost/CreatePost';
import About from './pages/About/About';
import { auth } from './config/firebase';

function App() {
	const [user] = useAuthState(auth)

  return (
		<div className={styles.App}>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path='/' element={user ? <Home /> : <Login />} />
					<Route path='/about' element={<About />} />
					<Route path='create_post' element={<CreatePost />} />
					<Route path='*' element={<About />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;
