import { File } from 'src/lib/types/File'
import { GET_FILE_ENDPOINT } from 'src/lib/constants'
import callApi from 'src/lib/callApi'

export default async (fileId): Promise<File> => {
	const URI: string = GET_FILE_ENDPOINT.replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI)

	return await callApi<File>(request)
}