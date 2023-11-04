export default function createUserFile(userId, file) {
	const  URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/files`
	return fetch(URI, {
		method: 'POST',
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify(file)
	}).then(res => res.json() )
}