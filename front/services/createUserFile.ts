import { CREATE_USER_FILE_ENDPOINT } from 'shared/constants'
import { File } from 'back/domain/File'
import callApi from 'shared/callApi'

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