import { File } from 'back/domain/File'
import { GET_FILE_ENDPOINT } from 'shared/constants'
import callApi from 'shared/callApi'

export default async (fileId): Promise<File> => {
	const URI: string = GET_FILE_ENDPOINT.replace(':fileId', fileId)
	const request: RequestInfo = new Request(URI)

	return await callApi<File>(request)
}