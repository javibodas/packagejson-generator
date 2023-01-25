import FileDoesntBelongToUser from 'src/server/errors/FileDoesntBelongToUser'
import FileNotExist from 'src/server/errors/FileNotExist'
import UserNotExist from 'src/server/errors/UserNotExist'
import { userExists, fileExists, fileExistsInUser, deleteUserFile, deleteFile } from 'src/client/firebase/client'

export default async function handler(req, res) {
	const { query: { id, fid }, method } = req

	switch (method) {
	case 'DELETE':
		try {
			if (!(await fileExists(fid))) throw new FileNotExist()
			if (!(await userExists(id))) throw new UserNotExist()
			if (!(await fileExistsInUser(fid, id))) throw new FileDoesntBelongToUser()

			await deleteUserFile(fid, id)
			await deleteFile(fid)

			res.status(200).json({ id: fid })
		} catch (e) {
			const resp = { error: e.message }
            
			if (e instanceof UserNotExist) res.status(404).json(resp)
			else if (e instanceof FileNotExist) res.status(404).json(resp)
			else if (e instanceof FileDoesntBelongToUser) res.status(401).json(resp)
			else res.status(500).json(resp)
		}
		break
	default:
		res.setHeader('Allow', ['DELETE'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}