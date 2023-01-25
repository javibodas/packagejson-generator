export default function getFile(fileId) {
	const  URI = `${process.env.NEXT_PUBLIC_BASE_URL}/api/files/${fileId}`
	return fetch(URI).then(res => res.json() )
}