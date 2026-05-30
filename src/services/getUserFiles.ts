import { FileDetail } from 'src/lib/types/FileDetail'
import { GET_USER_FILES_ENDPOINT } from 'src/lib/constants'
import callApi from 'src/lib/callApi'

export default async (userId: string): Promise<Array<FileDetail>> => {
	const URI: string = GET_USER_FILES_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<Array<FileDetail>>(request)
}