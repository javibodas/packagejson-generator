import { useRouter } from 'next/router'
import createFile from 'src/client/services/createFile'
import updateFile from 'src/client/services/updateFile'

export default function useFile({ json }){

	const router = useRouter()

	const exportFile = () => {
		const filename = 'package.json'
		const blob = new Blob([JSON.stringify(json, 0 , 4)], {
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
		const response = await updateFile(fileId, json)

		if (response.error) console.log(response.error)
	}

	const handleCreateFile = async () => {
		const response = await createFile(json)

		if (response.error) console.log(response.error)
		else router.push('/files/' + response.id)
	}

	return { exportFile, handleCreateFile, handleUpdateFile }
}
