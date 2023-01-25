export default function deleteUserFile(userId, fileId) {
	const  URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/${userId}/files/${fileId}`
	return fetch(URI, {
		method: 'DELETE',
	}).then(res => res.json() )
}