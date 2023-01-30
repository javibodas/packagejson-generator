import { useRouter } from 'next/router'
import { loginWithGithub, logoutWithGithub, onAuthStateChanged } from 'src/client/firebase/client'
import createUser from 'src/client/services/createUser'
import createUserFile from 'src/client/services/createUserFile'
import deleteUserFile from 'src/client/services/deleteUserFile'

export default function useUser({ user, setUser }) {

	const router = useRouter()
    
	const isLogged = () => { return user.isLogged }

	const login = () => { return loginWithGithub() }

	const logout = () => { return logoutWithGithub() }

	const handleLogIn = () => {
		login()
			.then((userLogin) => {
				createUser(userLogin.uid)
				setUser({...userLogin, isLogged: true})
			})
			.catch((error) => console.log(error))
	}
    
	const handleLogout = () => {
		logout()
			.then(() => {
				setUser({isLogged: false})
				router.push('/')
			})
			.catch((error) => console.log(error))
	}

	const saveUserFile = async (fileContent) => {
		const response = await createUserFile(user.uid, fileContent)

		if (response.error) console.log(response.error)
		else router.push('/files/' + response.id)
	}

	const deleteFile = async (fileId) => {
		const response = await deleteUserFile(user.uid, fileId)
		
		if (response.error) console.log(response.error)
	}

	return { isLogged, onAuthStateChanged, handleLogIn, handleLogout, deleteFile, saveUserFile }
}