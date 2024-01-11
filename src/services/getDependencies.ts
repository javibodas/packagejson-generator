import { Dependencie } from 'src/lib/types/client/Dependencie'
import callApi from 'src/lib/util/callApi'

export default async (dependencieName: string): Promise<Array<Dependencie>> => {
	const request: RequestInfo = new Request(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dependencies/${dependencieName}`)

	return await callApi<Array<Dependencie>>(request)
}