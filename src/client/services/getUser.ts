import { GET_USER_ENDPOINT } from 'src/client/util/constants'
import { User } from 'src/client/types/User'
import callApi from 'src/client/util/callApi'

export default async (userId: string): Promise<User> => {
	const URI: string = GET_USER_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<User>(request)
}