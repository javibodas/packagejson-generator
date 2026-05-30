import { CREATE_FILE_ENDPOINT } from 'shared/constants'
import { File } from 'back/domain/File'
import callApi from 'shared/callApi'

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