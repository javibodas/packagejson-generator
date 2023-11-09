import UserRepository from 'src/server/database/repository/UserRepository'

export default async function handler(req, res) {
	const { body, method } = req

	switch (method) {
	case 'GET':
		try {
			const users = await UserRepository.findAll()

			return res.status(200).json({ users })
		} catch (e) {
			return res.status(500).json({ error: e.nessage })
		}
	case 'POST':
		try {
			const userCreated = await UserRepository.create(body.id)

			return res.status(200).json(userCreated)
		} catch (e) {
			return res.status(500).json({ error: e.message })
		}
	default:
		res.setHeader('Allow', ['GET', 'POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}
