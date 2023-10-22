import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
}

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuth = (user) => {
	if (!user) return null

	return { 
		avatar: user.photoURL, 
		username: user.displayName, 
		email: user.email, 
		uid: user.uid
	}
}

export const onAuthStateChanged = (onChange) => { 
	return firebase.auth().onAuthStateChanged((user) => { 
		onChange(mapUserFromFirebaseAuth(user))
	}) 
}

export const loginWithGithub = async () => { 
	const result = await firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider())
	const { user } = result

	return { ...mapUserFromFirebaseAuth(user) }
}

export const logoutWithGithub = () => { return firebase.auth().signOut() }