import { File } from 'src/client/types/File'
import { UPDATE_FILE_ENDPOINT } from 'src/util/constants'
import callApi from 'src/util/callApi'

export default async (fileId: string, file: File): Promise<File> => {
	const URI: string = UPDATE_FILE_ENDPOINT.replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI,
		{
			method: 'PUT',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify(file)
		}
	)

	return await callApi<File>(request)
}