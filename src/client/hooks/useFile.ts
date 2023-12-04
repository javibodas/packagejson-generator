import { NextRouter, useRouter } from 'next/router'
import { v4 } from 'uuid'
import createFile from 'src/client/services/createFile'
import updateFile from 'src/client/services/updateFile'
import { File } from 'src/types/File'

declare global {
	interface Navigator {
        msSaveOrOpenBlob?: (blob: Blob, defaultName?: string) => boolean,
		msSaveBlob?: (blob: Blob, defaultName?: string) => boolean
    }
}

export default function useFile(file: File) {

	const router: NextRouter = useRouter()

	const exportFile = (): void => {
		const filename: string = 'package.json'
		const blob: Blob = new Blob([JSON.stringify(file.json, null, 4)], {
			type: 'application/json'
		})

		if ((<Navigator>window.navigator).msSaveOrOpenBlob) {
			window.navigator.msSaveBlob(blob, filename)
			return
		}
        
		const anchorElement: HTMLAnchorElement = window.document.createElement('a')
		anchorElement.href = window.URL.createObjectURL(blob)
		anchorElement.download = filename   
		document.body.appendChild(anchorElement)
		anchorElement.click()        
		document.body.removeChild(anchorElement)
        
	}

	const handleUpdateFile = async (fileId: string): Promise<void> => {
		try {
			await updateFile(fileId, file)
		} catch (e) {
			console.log(e.message)
		}
	}

	const handleCreateFile = async (): Promise<void> => {
		try {
			file.id = v4()
			await createFile(file)

			router.push('/files/' + file.id)
		} catch (e) {
			console.log(e.message)
		}
	}

	return { exportFile, handleCreateFile, handleUpdateFile }
}
