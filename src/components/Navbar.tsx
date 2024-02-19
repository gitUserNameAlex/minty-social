import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import styles from './Navbar.module.css'

const Navbar = () => {
	const [user] = useAuthState(auth)

	const userOutNavigate = useNavigate()

	const signUserOut = async () => {
		await signOut(auth)
		userOutNavigate('/')
		
	}

  return (
		<div className={styles.navbar}>
			<ul className={styles.navbarList}>
				<li className={styles.navbarLink}>
					{!user ? <Link to='/about'>About Us</Link> : <Link to='/'>News</Link>}
				</li>
				<li className={styles.navbarLink}>
					{!user ? <Link to='/'>Sign In</Link> : <Link to='/create_post'>Create post</Link>}
				</li>
			</ul>
			{user && (
				<div className={styles.navbarUser}>
					<p className={styles.navbarUserText}>{user?.displayName}</p>
					<img src={user?.photoURL || ''} className={styles.navbarUserImg} />
					<button onClick={signUserOut} className={styles.navbarSignOut}>
						Sign out
					</button>
				</div>
			)}
		</div>
	)
}

export default Navbar
