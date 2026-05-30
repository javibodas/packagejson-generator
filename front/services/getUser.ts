import { GET_USER_ENDPOINT } from 'shared/constants'
import { User } from 'back/domain/User'
import callApi from 'shared/callApi'

export default async (userId: string): Promise<User> => {
	const URI: string = GET_USER_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<User>(request)
}