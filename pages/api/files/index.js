import FileRepository from 'src/server/database/repository/FileRepository'

export default async function handler(req, res) {
	const { method, body } = req

	switch (method) {
	case 'GET':
		try {
			const files = await FileRepository.findAll()

			return res.status(200).json({ files })
		} catch(e) {
			return res.status(500).json({ error: e.message })
		}
	case 'POST':
		try {
			const file = FileRepository.create(body)
			
			return res.status(200).json(file)
		} catch (e) {
			return res.status(500).json({ error: e.message })
		}
	default:
		res.setHeader('Allow', ['GET', 'POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}