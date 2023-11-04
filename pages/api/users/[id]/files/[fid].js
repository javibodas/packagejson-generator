import databaseConnect from 'src/server/database'
import User from 'src/server/models/User'
import File from 'src/server/models/File'
import UserNotExist from 'src/server/errors/UserNotExist'
import FileDoesntBelongToUser from 'src/server/errors/FileDoesntBelongToUser'
import FileNotExist from 'src/server/errors/FileNotExist'


databaseConnect()

export default async function handler(req, res) {
	const { query: { id: userId, fid: fileId }, method } = req

	switch (method) {
	case 'DELETE':
		try {
			const user = await User.findById(userId)
			const file = await File.findById(fileId)

			if (!file) throw new FileNotExist()
			if (!user) throw new UserNotExist()
			if (!fileBelongsToUser(fileId, userId)) throw new FileDoesntBelongToUser()
			
			await File.findByIdAndDelete(fileId)

			res.status(200).json({ id: fileId })
		} catch (e) {
			const resp = { error: e.message }
            
			if (e instanceof UserNotExist || e instanceof FileNotExist) res.status(404).json(resp)
			else if (e instanceof FileDoesntBelongToUser) res.status(401).json(resp)
			else res.status(500).json(resp)
		}
		break
	default:
		res.setHeader('Allow', ['DELETE'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}

const fileBelongsToUser = function(fileId, userId) {
	return File.exists({ id: fileId, createdBy: userId })
}