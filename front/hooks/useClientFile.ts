import { File } from 'back/domain/File'
import { useEffect, useState } from 'react'
import getFile from 'front/services/getFile'

export default function useClientFile(fileId: string | undefined) {
	const [file, setFile] = useState<File | null>(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!fileId) {
			setLoading(false)
			return
		}

		const fetchFile = async () => {
			try {
				setLoading(true)
				setError(null)
				const fetchedFile = await getFile(fileId)
				setFile(fetchedFile)
			} catch (err) {
				setError('File not found')
				setFile(null)
			} finally {
				setLoading(false)
			}
		}

		fetchFile()
	}, [fileId])

	return { file, loading, error }
}