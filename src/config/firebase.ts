import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
	apiKey: 'AIzaSyCioQEuYJLboQMD8JvYZSlZGa67yWbFJeM',
	authDomain: 'minty-social-8d298.firebaseapp.com',
	projectId: 'minty-social-8d298',
	storageBucket: 'minty-social-8d298.appspot.com',
	messagingSenderId: '455805180041',
	appId: '1:455805180041:web:9b188b7ffde00428bc4e58',
}


const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const provider = new GoogleAuthProvider()
