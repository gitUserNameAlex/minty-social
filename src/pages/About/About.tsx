import React from 'react'
import styles from './About.module.css'

const About = () => {
  return (
		<div className={styles.about}>
			<p className={styles.aboutText}>
				So, here's Minty-Social - the
				brainchild of a frontend-developer who wanted to mix learning with
				some positive vibes. It's not just a social thing; it's a chill spot where
				you can throw your thoughts out there, read some interesting stuff, and
				maybe learn a thing or two along the way.
			</p>

            <i className={styles.aboutAuthor}>Prod by LilMint</i>
		</div>
	)
}

export default About
