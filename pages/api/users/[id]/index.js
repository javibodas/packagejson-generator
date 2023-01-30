import databaseConnect from 'src/server/database'
import User from 'src/server/models/User'
import File from 'src/server/models/File'
import UserNotExist from 'src/server/errors/UserNotExist'

databaseConnect()

export default async function handler(req, res) {
	const { query: { id }, method } = req

	switch (method) {
	case 'GET':
		try {
			const user = await User.findById(id)
			if(!user) throw new UserNotExist()

			user.files = await getUserFilesDetail(user.files)

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

const getUserFilesDetail = async function(files) {


	const userFilesForFilter = await Promise.all(
		files.map(async (fileId) => { 
			const file = await File.findById(fileId)
			return file
		})
	)

	const userFilesFiltered = userFilesForFilter.filter((file) => file != null)

	return userFilesFiltered.map((file) => {
		const { _id, createdAt, json } = file._doc
		const { name, version, description } = json
		
		return { id: _id, name, version, description, createdAt }
	})
}