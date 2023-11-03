export default (fileId, file) => {
	const  URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/${fileId}`
	return fetch(URI, {
		method: 'PUT',
		headers: { 'Content-Type' : 'application/json' },
		body: JSON.stringify(file)
	}).then(res => res.json())
}