import FileNotExist from 'src/server/errors/FileNotExist'
import { fileExists, getFile, updateFile, deleteFile } from 'src/client/firebase/client'

export default async function handler(req, res) {
	const { query: { pid }, method, body } = req

	switch (method) {
	case 'GET':
		try {
			if (! (await fileExists(pid))) throw new FileNotExist()

			const file = await getFile(pid)

			res.status(200).json({ id: pid, json: file.jsonFile })
		} catch (e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExist) res.status(404).json(resp)
			else res.status(500).json(resp)
		}
		break
	case 'PUT':
		try {
			if (! (await fileExists(pid))) throw new FileNotExist()

			await updateFile(pid, body)

			res.status(200).json({ id: pid })
		} catch(e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExist) res.status(404).json(resp)
			else res.status(500).json(resp)
		}
		break
	case 'DELETE':
		try {
			if (! (await fileExists(pid))) throw new FileNotExist()

			await deleteFile(pid)

			res.status(200).json({ id: pid })
		} catch(e) {
			const resp = { error : e.message }

			if (e instanceof FileNotExist) res.status(404).json(resp)
			else res.status(500).json(resp)
		}
		break
	default:
		res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}