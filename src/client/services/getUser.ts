import callApi from 'src/util/callApi'
import { User } from 'src/types/User'
import { GET_USER_ENDPOINT } from 'src/util/constants'

export default async (userId: string): Promise<User> => {
	const URI: string = GET_USER_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<User>(request)
}