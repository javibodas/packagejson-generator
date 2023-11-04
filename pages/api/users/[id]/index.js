import databaseConnect from 'src/server/database'
import User from 'src/server/models/User'
import File from 'src/server/models/File'
import UserNotExist from 'src/server/errors/UserNotExist'

databaseConnect()

export default async function handler(req, res) {
	const { query: { id: userId }, method } = req

	switch (method) {
	case 'GET':
		try {
			let user = await User.findById(userId)
			if(!user) throw new UserNotExist()
			user = user.toObject()

			user.files = await getUserFiles(userId)

			return res.status(200).json(user)
		} catch (e) {
			const resp = { error: e.message }

			if (e instanceof UserNotExist) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['GET'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}

const getUserFiles = async function(userId) {

	const userFiles = await File.find({ createdBy: userId }).exec()

	return userFiles.map((file) => {
		const { _id, createdAt, json } = file
		const { name, version, description } = json
		
		return { id: _id, name, version, description, createdAt }
	})
}