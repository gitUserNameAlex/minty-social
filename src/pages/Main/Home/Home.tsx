import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import Post from '../Post/Post'
import styles from './Home.module.css'

export interface IPost {
  id: string,
  userID: string,
  description: string,
  title: string,
  username: string
}

const Home = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null)
  const postsCollectionRef = collection(db, 'posts')

  const getPosts = async () => {
    const data = await getDocs(postsCollectionRef)
    setPostsList(data.docs.map((doc) => ({...doc.data(), id: doc.id})) as IPost[])
  }

  useEffect(() => {
    getPosts()
  },[])


  return (
		<div>
			<p className={styles.postsTitle}>What's new?</p>
			<div className={styles.postsContainer}>
				{postsList?.map((post) => (
					<Post post={post} key={post.id}/>
				))}
			</div>
		</div>
	)
}

export default Home
