import databaseConnect from 'src/server/database'
import User from 'src/server/models/User'

databaseConnect()

export default async function handler(req, res) {
	const { body, method } = req

	switch (method) {
	case 'GET':
		try {
			const users = await User.find()

			return res.status(200).json({ users })
		} catch (e) {
			return res.status(500).json({ error: e.nessage })
		}
	case 'POST':
		try {
			const user = new User({ _id: body.id })
			await user.save()

			return res.status(200).json(user)
		} catch (e) {
			return res.status(500).json({ error: e.message })
		}
	default:
		res.setHeader('Allow', ['GET', 'POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}
