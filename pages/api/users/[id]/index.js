import UserNotExist from 'src/server/errors/UserNotExist'
import { userExists, getUser } from 'src/client/firebase/client'

export default async function handler(req, res) {
	const { query: { id }, method } = req

	switch (method) {
	case 'GET':
		try {
			if (!(await userExists(id))) throw new UserNotExist()

			const user = await getUser(id)
			res.status(200).json(user)
		} catch (e) {
			const resp = { error: e.message }

			if (e instanceof UserNotExist) res.status(404).json(resp)
			else res.status(500).json(resp)
		}
		break
	default:
		res.setHeader('Allow', ['GET'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}