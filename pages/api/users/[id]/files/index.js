import UserRepository from 'src/server/database/repository/UserRepository'
import FileRepository from 'src/server/database/repository/FileRepository'
import UserNotExistError from 'src/server/errors/UserNotExist'

export default async function handler(req, res) {
	const { query: { id }, method, body } = req

	switch (method) {
	case 'POST':
		try {
			const user = await UserRepository.findById(id)
			if (!user) throw new UserNotExistError()
			
			const file = FileRepository.create(body)
			
			return res.status(200).json({ id: file.id })
		} catch (e) {
			const resp = { error: e.message }
            
			if (e instanceof UserNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}