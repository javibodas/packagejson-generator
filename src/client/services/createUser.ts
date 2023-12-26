import { CREATE_USER_ENDPOINT } from 'src/util/constants'
import { User } from 'src/client/types/User'
import callApi from 'src/util/callApi'

export default async (userId: string): Promise<User> => {
	const request: RequestInfo = new Request(CREATE_USER_ENDPOINT,
		{
			method: 'POST',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify({ id: userId })
		}
	)

	return await callApi<User>(request)
}