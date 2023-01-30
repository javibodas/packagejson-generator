export default function createUser(userId) {
	const  URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
	return fetch(URI, {
		method: 'POST',
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify({ id: userId })
	}).then(res => res.json() )
}