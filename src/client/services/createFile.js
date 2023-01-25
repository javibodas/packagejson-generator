export default function createFile(fileContent) {
	const  URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/create`
	return fetch(URI, {
		method: 'POST',
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify(fileContent)
	}).then(res => res.json() )
}