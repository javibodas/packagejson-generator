import { Dependencie } from 'back/domain/Dependencie'
import callApi from 'shared/callApi'

export default async (dependencieName: string): Promise<Array<Dependencie>> => {
	const request: RequestInfo = new Request(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dependencies/${dependencieName}`)

	return await callApi<Array<Dependencie>>(request)
}