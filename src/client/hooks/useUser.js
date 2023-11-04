import { useRouter } from 'next/router'
import { uuid } from 'uuidv4'
import { loginWithGithub, logoutWithGithub, onAuthStateChanged } from 'src/client/firebase/client'
import createUser from 'src/client/services/createUser'
import createUserFile from 'src/client/services/createUserFile'
import deleteUserFile from 'src/client/services/deleteUserFile'

export default function useUser({ user, setUser }) {

	const router = useRouter()

	const login = () => { return loginWithGithub() }

	const logout = () => { return logoutWithGithub() }

	const handleLogIn = async () => {
		try {
			const userLogin = await login()
			const userCreated = await createUser(userLogin.uid)
			if (userCreated.error) throw new Error(userCreated.error)

			setUser({...userLogin, isLogged: true})
		} catch (e) {
			console.log(e.message)
		}
	}
    
	const handleLogout = async () => {
		try {
			await logout()

			setUser({isLogged: false})
			router.push('/')
		} catch (e) {
			console.log(e.message)
		}
	}

	const saveUserFile = async (file) => {
		try {
			file.createdBy = user.uid
			file.id = uuid()
			const response = await createUserFile(user.uid, file)

			if (response.error) throw new Error(response.error)

			router.push('/files/' + response.id)
		} catch (e) {
			console.log(e.message)
		}
	}

	const deleteFile = async (fileId) => {
		try {
			const response = await deleteUserFile(user.uid, fileId)
		
			if (response.error) throw new Error(response.error)

			return true
		} catch (e) {
			console.log(e.message)
			return false
		}
	}

	return { onAuthStateChanged, handleLogIn, handleLogout, deleteFile, saveUserFile }
}