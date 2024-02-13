import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styles from './App.module.css'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import CreatePost from './pages/CreatePost/CreatePost';

function App() {
  return (
		<div className={styles.App}>
			<BrowserRouter>
        <Navbar/>
				<Routes>
					<Route path='*' element={<Home />} />
					<Route path='/' element={<Home />} />
					<Route path='/login' element={<Login />} />
					<Route path='create_post' element={<CreatePost />}/>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App;
