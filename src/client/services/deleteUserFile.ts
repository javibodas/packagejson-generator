import { DELETE_USER_FILE_ENDPOINT } from 'src/client/util/constants'
import { File } from 'src/client/types/File'
import callApi from 'src/client/util/callApi'

export default async (userId: string, fileId: string): Promise<File> => {
	const URI: string = DELETE_USER_FILE_ENDPOINT.replace(':userId', userId).replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI,
		{ method: 'DELETE' }
	)

	return await callApi<File>(request)
}