import UserRepository from 'src/server/database/repository/UserRepository'
import FileRepository from 'src/server/database/repository/FileRepository'
import UserNotExistError from 'src/server/errors/UserNotExist'

export default async function handler(req, res) {
	const { query: { id: userId }, method } = req

	switch (method) {
	case 'GET':
		try {
			let user = await UserRepository.findById(userId)
			if(!user) throw new UserNotExistError()
			user = user.toObject()

			user.files = await FileRepository.getFilesByUserId(userId)

			return res.status(200).json(user)
		} catch (e) {
			const resp = { error: e.message }

			if (e instanceof UserNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['GET'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}