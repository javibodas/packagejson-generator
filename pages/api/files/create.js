import { createFile } from 'src/client/firebase/client'

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
	case 'POST':
		try {
			const fileId = await createFile(body)
			
			res.status(200).json({ id: fileId })
		} catch (e) {
			res.status(500).json({ error: e.message })
		}
		break
	default:
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}