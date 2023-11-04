import { useRouter } from 'next/router'
import { uuid } from 'uuidv4'
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
			file.id = uuid()
			const response = await createFile(file)

			if (response.error) throw new Error(response.error)
			
			router.push('/files/' + response.id)
		} catch (e) {
			console.log(e.message)
		}
	}

	return { exportFile, handleCreateFile, handleUpdateFile }
}
