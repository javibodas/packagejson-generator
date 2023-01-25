export default function getUser(userId) {
	const  URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}`
	return fetch(URI).then(res => res.json() )
}