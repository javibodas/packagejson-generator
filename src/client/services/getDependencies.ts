import callApi from 'src/util/callApi'
import { Dependencie } from 'src/types/Dependencie'

export default async (dependencieName: string): Promise<Array<Dependencie>> => {
	const request: RequestInfo = new Request(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dependencies/${dependencieName}`)

	return await callApi<Array<Dependencie>>(request)
}