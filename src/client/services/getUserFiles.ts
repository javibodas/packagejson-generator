import { FileDetail } from 'src/client/types/FileDetail'
import { GET_USER_FILES_ENDPOINT } from 'src/client/util/constants'
import callApi from 'src/client/util/callApi'

export default async (userId: string): Promise<Array<FileDetail>> => {
	const URI: string = GET_USER_FILES_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<Array<FileDetail>>(request)
}