import { CREATE_FILE_ENDPOINT } from 'src/lib/util/constants'
import { File } from 'src/lib/types/client/File'
import callApi from 'src/lib/util/callApi'

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