import { File } from 'src/lib/types/client/File'
import { UseUserProps } from 'src/lib/types/client/hooks/UseUserProps'
import { User } from 'src/lib/types/client/User'
import { loginWithGithub, logoutWithGithub, onAuthStateChanged } from 'src/lib/firebase/auth'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import createUser from 'src/services/createUser'
import createUserFile from 'src/services/createUserFile'
import deleteUserFile from 'src/services/deleteUserFile'

export default function useUser({ user, setUser }: UseUserProps) {

	const router = useRouter()

	const handleLogIn = async (): Promise<void> => {
		try {
			const user: User = await loginWithGithub()
			await createUser(user)

			setUser(user)
		} catch (e) {
			console.log(e.message)
		}
	}
    
	const handleLogout = async (): Promise<void> => {
		try {
			await logoutWithGithub()

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