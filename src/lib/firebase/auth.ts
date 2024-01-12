import { 
	AuthProvider,
	User as FirebaseUser,
	GithubAuthProvider,
	UserCredential,
	onAuthStateChanged as _onAuthStateChanged,
	signInWithPopup,
} from 'firebase/auth'
import { User } from 'src/lib/types/client/User'
import { auth } from 'src/lib/firebase/firebase'

const mapUserFromFirebaseAuth = (user: FirebaseUser): User => {
	if (!user) return null

	return { 
		avatar: user.photoURL, 
		username: user.displayName, 
		email: user.email, 
		id: user.uid
	}
}

export const onAuthStateChanged = (onChange) => { 
	return _onAuthStateChanged(auth, (user: FirebaseUser) => { 
		onChange(mapUserFromFirebaseAuth(user)) 
	}) 
}

export const loginWithGithub = async (): Promise<User> => {
	const provider: AuthProvider = new GithubAuthProvider()
	try {
		const result: UserCredential = await signInWithPopup(auth, provider)
		const { user } = result

		return mapUserFromFirebaseAuth(<FirebaseUser> user)
	} catch (error) {
		console.error('Error signing in with github', error)
	}
}

export const logoutWithGithub = (): Promise<void> => { 
	try {
		return auth.signOut()
	} catch (error) {
		console.error('Error signing out with Github', error)
	}
}