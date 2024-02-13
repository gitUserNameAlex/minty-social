import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../config/firebase'
import { signInWithPopup } from 'firebase/auth'

const Login = () => {

    const navigate = useNavigate()

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider)
        console.log(result)
        navigate('/')
    }


  return (
    <div>
      <h1>Login page</h1>
      <h1>Here you can sign in with google</h1>
      <button onClick={googleSignIn}>Sign in</button>
    </div>
  )
}

export default Login
