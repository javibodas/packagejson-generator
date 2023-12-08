import { File } from 'src/types/File'
import { GET_USER_FILES_ENDPOINT } from 'src/util/constants'
import callApi from 'src/util/callApi'

export default async (userId: string): Promise<Array<File>> => {
	const URI: string = GET_USER_FILES_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<Array<File>>(request)
}