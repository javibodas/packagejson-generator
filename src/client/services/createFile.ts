import { CREATE_FILE_ENDPOINT } from 'src/util/constants'
import { File } from 'src/client/types/File'
import callApi from 'src/util/callApi'

export default async (file: File): Promise<File> => {
	const request: RequestInfo = new Request(CREATE_FILE_ENDPOINT,
		{
			method: 'POST',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify(file)
		}
	)

	return await callApi<File>(request)
}