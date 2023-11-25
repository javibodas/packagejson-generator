import callApi from 'src/util/callApi'
import { File } from 'src/types/File'
import { DELETE_USER_FILE_ENDPOINT } from 'src/util/constants'

export default async (userId: string, fileId: string): Promise<File> => {
	const URI: string = DELETE_USER_FILE_ENDPOINT.replace(':userId', userId).replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI,
		{ method: 'DELETE' }
	)

	return await callApi<File>(request)
}