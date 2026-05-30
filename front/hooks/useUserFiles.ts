import { FileDetail } from 'back/domain/FileDetail'
import { useEffect, useState } from 'react'
import getUserFiles from 'front/services/getUserFiles'

export default function useUserFiles(userId: string | undefined) {
	const [files, setFiles] = useState<Array<FileDetail>>([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!userId) {
			setLoading(false)
			return
		}

		const fetchFiles = async () => {
			try {
				setLoading(true)
				setError(null)
				const fetchedFiles = await getUserFiles(userId)
				setFiles(fetchedFiles || [])
			} catch (err) {
				setError('Failed to load user files')
				setFiles([])
			} finally {
				setLoading(false)
			}
		}

		fetchFiles()
	}, [userId])

	return { files, setFiles, loading, error }
}