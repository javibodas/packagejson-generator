import UserNotExist from 'src/server/errors/UserNotExist'
import { userExists, addFileToUser, createFile } from 'src/client/firebase/client'

export default async function handler(req, res) {
	const { query: { id }, method, body } = req

	switch (method) {
	case 'POST':
		try {
			if (!(await userExists(id))) throw new UserNotExist()
			
			const fileId = await createFile(body)
			await addFileToUser(id, fileId)
			
			res.status(200).json({ id: fileId })
		} catch (e) {
			const resp = { error: e.message }
            
			if (e instanceof UserNotExist) res.status(404).json(resp)
			else res.status(500).json(resp)
		}
		break
	default:
		res.setHeader('Allow', ['POST'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}