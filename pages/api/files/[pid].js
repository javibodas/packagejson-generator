import databaseConnect from 'src/server/database'
import File from 'src/server/models/File'
import FileNotExist from 'src/server/errors/FileNotExist'

databaseConnect()

export default async function handler(req, res) {
	const { query: { pid: fileId }, method, body } = req

	switch (method) {
	case 'GET':
		try {
			const file = await File.findById(fileId)
			if (!file) throw new FileNotExist()

			return res.status(200).json(file)
		} catch (e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExist) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'PUT':
		try {
			const fileUpdated = await File.findByIdAndUpdate(fileId, body, { new: true })
			if (!fileUpdated) throw new FileNotExist()

			return res.status(200).json(fileUpdated)
		} catch(e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExist) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'DELETE':
		try {
			const fileDeleted = await File.findByIdAndDelete(fileId)
			if (!fileDeleted) throw new FileNotExist()

			return res.status(200).json({ id: fileId })
		} catch(e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExist) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}