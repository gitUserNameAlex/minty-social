import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, provider } from '../../config/firebase'
import { signInWithPopup } from 'firebase/auth'
import styles from './Login.module.css'

const Login = () => {

    const navigate = useNavigate()

    const googleSignIn = async () => {
        const result = await signInWithPopup(auth, provider)
        navigate('/')
    }


  return (
    <div className={styles.login}>
      <p className={styles.loginText}>Here you can sign in with Google</p>
      <button onClick={googleSignIn} className={styles.loginBtn}>Sign in</button>
    </div>
  )
}

export default Login
