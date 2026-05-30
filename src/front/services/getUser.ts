import { GET_USER_ENDPOINT } from 'src/shared/constants'
import { User } from 'src/back/domain/User'
import callApi from 'src/shared/callApi'

export default async (userId: string): Promise<User> => {
	const URI: string = GET_USER_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<User>(request)
}