export default async <T>(request: Request): Promise<T> => {    
	return await fetch(request).then(res => res.json())
}