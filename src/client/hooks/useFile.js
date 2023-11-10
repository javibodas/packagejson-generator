import { useRouter } from 'next/router'
import { v4 } from 'uuid'
import createFile from 'src/client/services/createFile'
import updateFile from 'src/client/services/updateFile'

export default function useFile(file) {

	const router = useRouter()

	const exportFile = () => {
		const filename = 'package.json'
		const blob = new Blob([JSON.stringify(file.json, 0 , 4)], {
			type: 'application/json'
		})

		if (window.navigator.msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename)
			return
		}
        
		let elem = window.document.createElement('a')
		elem.href = window.URL.createObjectURL(blob)
		elem.download = filename        
		document.body.appendChild(elem)
		elem.click()        
		document.body.removeChild(elem)
        
	}

	const handleUpdateFile = async (fileId) => {
		try {
			const response = await updateFile(fileId, file)

			if (response.error) throw new Error(response.error)
		} catch (e) {
			console.log(e.message)
		}
	}

	const handleCreateFile = async () => {
		try {
			file.id = v4()
			const response = await createFile(file)

			if (response.error) throw new Error(response.error)
			console.log(response)
			router.push('/files/' + file.id)
		} catch (e) {
			console.log(e.message)
		}
	}

	return { exportFile, handleCreateFile, handleUpdateFile }
}
