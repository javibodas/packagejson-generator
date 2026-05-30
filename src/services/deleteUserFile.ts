import { DELETE_USER_FILE_ENDPOINT } from 'src/lib/constants'
import { File } from 'src/lib/types/File'
import callApi from 'src/lib/callApi'

export default async (userId: string, fileId: string): Promise<File> => {
	const URI: string = DELETE_USER_FILE_ENDPOINT.replace(':userId', userId).replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI,
		{ method: 'DELETE' }
	)

	return await callApi<File>(request)
}