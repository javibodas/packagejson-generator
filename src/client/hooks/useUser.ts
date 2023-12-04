import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import { loginWithGithub, logoutWithGithub, onAuthStateChanged } from 'src/client/firebase/client'
import createUser from 'src/client/services/createUser'
import createUserFile from 'src/client/services/createUserFile'
import deleteUserFile from 'src/client/services/deleteUserFile'
import { File } from 'src/types/File'
import { User } from 'src/types/User'
import { UseUserProps } from 'src/types/hooks/UseUserProps'

export default function useUser({ user, setUser }: UseUserProps) {

	const router = useRouter()

	const login = (): Promise<User> => { return loginWithGithub() }

	const logout = (): Promise<void> => { return logoutWithGithub() }

	const handleLogIn = async (): Promise<void> => {
		try {
			const user: User = await login()
			await createUser(user.id)

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