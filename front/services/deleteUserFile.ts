import { DELETE_USER_FILE_ENDPOINT } from 'shared/constants'
import { File } from 'back/domain/File'
import callApi from 'shared/callApi'

export default async (userId: string, fileId: string): Promise<File> => {
	const URI: string = DELETE_USER_FILE_ENDPOINT.replace(':userId', userId).replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI,
		{ method: 'DELETE' }
	)

	return await callApi<File>(request)
}