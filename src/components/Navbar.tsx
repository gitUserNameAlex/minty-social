import React from 'react'
import { Link } from 'react-router-dom'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { signOut } from 'firebase/auth'
import styles from './Navbar.module.css'

const Navbar = () => {
	const [user] = useAuthState(auth)

	const signUserOut = async () => {
		await signOut(auth)
	}

  return (
		<div className={styles.navbar}>
			<ul>
				<li>
					<Link to='/' className={styles.navbarLink}>
						Home
					</Link>
				</li>
				<li>
					{!user ? (
						<Link to='/login' className={styles.navbarLink}>
							Sign in
						</Link>
					) : (
						<Link to='/create_post' className={styles.navbarLink}>
							Create post
						</Link>
					)}
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
