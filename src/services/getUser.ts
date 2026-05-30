import { GET_USER_ENDPOINT } from 'src/lib/constants'
import { User } from 'src/lib/types/User'
import callApi from 'src/lib/callApi'

export default async (userId: string): Promise<User> => {
	const URI: string = GET_USER_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<User>(request)
}