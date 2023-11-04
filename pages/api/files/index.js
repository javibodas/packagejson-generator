import databaseConnect from 'src/server/database'
import File from 'src/server/models/File'

databaseConnect()

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
	case 'GET':
		try {
			const files = await File.find()

			return res.status(200).json({ files })
		} catch(e) {
			return res.status(500).json({ error: e.message })
		}
	case 'POST':
		try {
			console.log(body)
			const file = new File(body)
			await file.save()
			
			return res.status(200).json({ id: file.id })
		} catch (e) {
			return res.status(500).json({ error: e.message })
		}
	default:
		res.setHeader('Allow', ['POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}