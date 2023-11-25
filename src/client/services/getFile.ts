import callApi from 'src/util/callApi'
import { File } from 'src/types/File'
import { GET_FILE_ENDPOINT } from 'src/util/constants'

export default async (fileId): Promise<File> => {
	const URI: string = GET_FILE_ENDPOINT.replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI)

	return await callApi<File>(request)
}