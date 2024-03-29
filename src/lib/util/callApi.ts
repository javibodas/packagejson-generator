import ApiResponseError from 'src/lib/errors/client/ApiResponseError'

export default async <T>(request: Request): Promise<T> => {
	const response: Response = await fetch(request)

	if (!response.ok) throw new ApiResponseError('Bad fetch response', response)
	
	return await response.json()
}