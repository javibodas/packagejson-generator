import firebase from 'firebase'

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: 'packagejson-generator.firebaseapp.com',
	databaseURL: 'https://packagejson-generator.firebaseio.com',
	projectId: 'packagejson-generator',
	storageBucket: 'packagejson-generator.appspot.com',
	messagingSenderId: '320777149161',
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
	measurementId: 'G-3D5B9YKHE9'
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