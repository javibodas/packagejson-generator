import { File } from 'src/client/types/File'
import { UseUserProps } from 'src/client/types/hooks/UseUserProps'
import { User } from 'src/client/types/User'
import { loginWithGithub, logoutWithGithub, onAuthStateChanged } from 'src/client/firebase/client'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import createUser from 'src/client/services/createUser'
import createUserFile from 'src/client/services/createUserFile'
import deleteUserFile from 'src/client/services/deleteUserFile'

export default function useUser({ user, setUser }: UseUserProps) {

	const router = useRouter()

	const login = (): Promise<User> => { return loginWithGithub() }

	const logout = (): Promise<void> => { return logoutWithGithub() }

	const handleLogIn = async (): Promise<void> => {
		try {
			const user: User = await login()
			await createUser(user)

			setUser(user)
		} catch (e) {
			console.log(e.message)
		}
	}
    
	const handleLogout = async (): Promise<void> => {
		try {
			await logout()

			setUser(undefined)
			router.push('/')
		} catch (e) {
			console.log(e.message)
		}
	}

	const saveUserFile = async (file: File): Promise<void> => {
		try {
			file.createdBy = user.id
			file.id = v4()
			
			const response = await createUserFile(user.id, file)

			router.push('/files/' + response.id)
		} catch (e) {
			console.log(e.message)
		}
	}

	const deleteFile = async (fileId: string): Promise<boolean> => {
		try {
			await deleteUserFile(user.id, fileId)

			return true
		} catch (e) {
			console.log(e.message)
			return false
		}
	}

	return { onAuthStateChanged, handleLogIn, handleLogout, deleteFile, saveUserFile }
}