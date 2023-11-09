import FileRepository from 'src/server/database/repository/FileRepository'
import FileNotExistError from 'src/server/errors/FileNotExist'

export default async function handler(req, res) {
	const { query: { pid: fileId }, method, body } = req

	switch (method) {
	case 'GET':
		try {
			const file = await FileRepository.findById(fileId)
			if (!file) throw new FileNotExistError()

			return res.status(200).json(file)
		} catch (e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'PUT':
		try {
			const fileUpdated = await FileRepository.update(fileId, body)
			if (!fileUpdated) throw new FileNotExistError()

			return res.status(200).json(fileUpdated)
		} catch(e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'DELETE':
		try {
			const fileDeleted = await FileRepository.deleteById(fileId)
			if (!fileDeleted) throw new FileNotExistError()

			return res.status(200).json({ id: fileId })
		} catch(e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}