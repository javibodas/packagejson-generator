import { CREATE_USER_FILE_ENDPOINT } from 'src/lib/util/constants'
import { File } from 'src/lib/types/client/File'
import callApi from 'src/lib/util/callApi'

export default async (userId: string, file: File): Promise<File> => {
	const URI: string = CREATE_USER_FILE_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI,
		{
			method: 'POST',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify(file)
		}
	)

	return await callApi<File>(request)
}