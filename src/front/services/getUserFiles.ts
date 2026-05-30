import { FileDetail } from 'src/back/domain/FileDetail'
import { GET_USER_FILES_ENDPOINT } from 'src/shared/constants'
import callApi from 'src/shared/callApi'

export default async (userId: string): Promise<Array<FileDetail>> => {
	const URI: string = GET_USER_FILES_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<Array<FileDetail>>(request)
}