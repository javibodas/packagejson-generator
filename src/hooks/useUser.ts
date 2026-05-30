import { File } from 'src/lib/types/File'
import { UseUserProps } from 'src/lib/types/client/hooks/UseUserProps'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import createUserFile from 'src/services/createUserFile'
import deleteUserFile from 'src/services/deleteUserFile'

export default function useUser({ user }: UseUserProps) {

	const router = useRouter()

	const handleLogIn = async (): Promise<void> => {
		await signIn('github', { callbackUrl: '/' })
	}

	const handleLogout = async (): Promise<void> => {
		await signOut({ callbackUrl: '/' })
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

	return { handleLogIn, handleLogout, deleteFile, saveUserFile }
}
