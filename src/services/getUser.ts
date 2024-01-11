import { GET_USER_ENDPOINT } from 'src/lib/util/constants'
import { User } from 'src/lib/types/client/User'
import callApi from 'src/lib/util/callApi'

export default async (userId: string): Promise<User> => {
	const URI: string = GET_USER_ENDPOINT.replace(':userId', userId)
	const request: RequestInfo = new Request(URI)
	
	return await callApi<User>(request)
}