import { useRouter } from 'next/router'
import { loginWithGithub, logoutWithGithub, onAuthStateChanged, deleteUserFile, addUserFile } from 'src/firebase/client'

export default function useUser({ user, setUser }) {

	const router = useRouter()
    
	const isLogged = () => { return user.isLogged }

	const login = () => { return loginWithGithub() }

	const logout = () => { return logoutWithGithub() }

	const handleLogIn = function() {
		login()
			.then((userLogin) => setUser({...userLogin, isLogged: true}))
			.catch((error) => console.log(error))
	}
    
	const handleLogout = function() {
		logout()
			.then(() => {
				setUser({isLogged: false})
				router.push('/')
			})
			.catch((error) => console.log(error))
	}

	const saveUserFile = function(file) {
		addUserFile(file, user.uid)
			.then((element) => router.push('/files/' + element.id))
			.catch((error) => console.log(`Failed saving file into user ${user.uid}: ${error}`) )
	}

	const deleteFile = (fileId) => {
		deleteUserFile(fileId, user.uid)
			.then(() => console.log(`File ${fileId} removed from user ${user.uid}`))
			.catch((error) => console.log(error) )
	}

	return { isLogged, onAuthStateChanged, handleLogIn, handleLogout, deleteFile, saveUserFile }
}