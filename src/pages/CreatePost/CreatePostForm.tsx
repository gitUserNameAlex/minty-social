import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { collection, addDoc } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { db } from '../../config/firebase'
import { auth } from '../../config/firebase'
//addDoc - добавить документ(т.е. пост)
//collection - posts DB

interface FormData {
    title: string,
    description: string
}

const CreatePostForm = () => {
    const navigate = useNavigate()

    //Here we also need user to send it to db
    const [user] = useAuthState(auth)

    //form structure and validation
    const formSchema = yup.object().shape({
        title: yup.string().required("You should add some title to your post"),
        description: yup.string().required("Description is a necessary option")
    })


    //everything we are doing with the form - we are doing with the help of useForm hook
    const {register, handleSubmit, formState:{errors}} = useForm<FormData>({
        resolver: yupResolver(formSchema)
    })

    //submitting form
    const onCreatePost = async (data: FormData) => {
        await addDoc(postsCollectionRef, {
            title: data.title,
            description: data.description,
            username: user?.displayName,
            userID: user?.uid
        })

        navigate('/')
    }


    //initializing collection
    const postsCollectionRef = collection(db, 'posts')

  return (
		<form onSubmit={handleSubmit(onCreatePost)}>
			<input type='text' placeholder='Title...' {...register('title')} />
			<p style={{ color: 'orange' }}>{errors.title?.message}</p>
			<textarea placeholder='Description...' {...register('description')} />
			<p style={{ color: 'orange' }}>{errors.description?.message}</p>
			<input type='submit' />
		</form>
	)
}

export default CreatePostForm
