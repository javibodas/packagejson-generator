import UserRepository from 'src/server/database/repository/UserRepository'
import FileRepository from 'src/server/database/repository/FileRepository'
import UserNotExistError from 'src/server/errors/UserNotExist'
import FileDoesntBelongToUserError from 'src/server/errors/FileDoesntBelongToUser'
import FileNotExistError from 'src/server/errors/FileNotExist'

export default async function handler(req, res) {
	const { query: { id: userId, fid: fileId }, method } = req

	switch (method) {
	case 'DELETE':
		try {
			const user = await UserRepository.findById(userId)
			const file = await FileRepository.findById(fileId)

			if (!file) throw new FileNotExistError()
			if (!user) throw new UserNotExistError()
			if (!fileBelongsToUser(fileId, userId)) throw new FileDoesntBelongToUserError()
			
			await FileRepository.deleteById(fileId)

			res.status(200).json({ id: fileId })
		} catch (e) {
			const resp = { error: e.message }
            
			if (e instanceof UserNotExistError || e instanceof FileNotExistError) res.status(404).json(resp)
			else if (e instanceof FileDoesntBelongToUserError) res.status(401).json(resp)
			else res.status(500).json(resp)
		}
		break
	default:
		res.setHeader('Allow', ['DELETE'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}

const fileBelongsToUser = function(fileId, userId) {
	return FileRepository.existsBy({ id: fileId, createdBy: userId })
}