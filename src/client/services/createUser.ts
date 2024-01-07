import { CREATE_USER_ENDPOINT } from 'src/client/util/constants'
import { User } from 'src/client/types/User'
import callApi from 'src/client/util/callApi'

export default async (user: User): Promise<User> => {
	const request: RequestInfo = new Request(CREATE_USER_ENDPOINT,
		{
			method: 'POST',
			headers: { 'Content-Type' : 'application/json' },
			body: JSON.stringify(user)
		}
	)

	return await callApi<User>(request)
}