import React, { useEffect, useState } from 'react'
import { IPost } from '../Home/Home'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db } from '../../../config/firebase'
import { auth } from '../../../config/firebase'
import styles from './Post.module.css';

interface PostProps {
    post: IPost
}

interface Like {
    whoLikedID: string,
    likeID: string,
}

const Post = (props: PostProps) => {
    const [likes, setLikes] = useState<Like[] | null>(null)

    const likesCollectionRef = collection(db, 'likes')
    const likesDoc = query(likesCollectionRef, where("postID", '==', props.post.id))
    const [user] = useAuthState(auth)

    const addLike = async () => {
        try {
        const newDoc = await addDoc(likesCollectionRef, {
            postID: props.post.id,
            whoLikedID: user?.uid,
            whoLikedUsername: user?.displayName
        })
        if (user) {
            setLikes((prev) => prev ? [...prev, {whoLikedID: user.uid, likeID: newDoc.id}] : [{whoLikedID: user.uid, likeID: newDoc.id}])
        }
        } catch (err) {
            console.log(err)
        }
    }

        const removeLike = async () => {
            try {
                const likeToDeleteQuery = query(likesCollectionRef, where("postID", '==', props.post.id), where("whoLikedID", '==', user?.uid))
                const likeToDeleteData = await getDocs(likeToDeleteQuery)
                const likeToDelete = doc(db, 'likes', likeToDeleteData.docs[0].id)
                await deleteDoc(likeToDelete)
                if (user) {
                    setLikes((prev) => prev && prev.filter((like) => like.likeID !== likeToDeleteData.docs[0].id))
                }
            } catch (err) {
                console.log(err)
            }
    }

    const getLikes = async() => {
        const data = await getDocs(likesDoc)
        setLikes(data.docs.map((doc) => ({whoLikedID: doc.data().whoLikedID, likeID: doc.id})))
    }

    const hasUserLiked = likes?.find((like) => like.whoLikedID === user?.uid)

    useEffect(() => {
        getLikes()
    },[])

  return (
		<article className={styles.post}>
			<div className='title'>
				<p className={styles.postTitle}>{props.post.title}</p>
			</div>
			<div className='body'>
				<p className={styles.postDescription}>{props.post.description}</p>
			</div>
			<div className='footer'>
				<p className={styles.postUsername}>@{props.post.username}</p>
			</div>
			<button onClick={hasUserLiked ? removeLike : addLike} className={styles.postBtn}>
				{hasUserLiked ? 'Remove like' : 'Like'}
			</button>
			{likes && <p className={styles.postLikes}>Liked by: {likes?.length}</p>}
		</article>
	)
}

export default Post
