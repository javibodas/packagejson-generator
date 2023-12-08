import type { NextApiRequest, NextApiResponse } from 'next'
import { File } from 'src/types/File'
import FileNotExistError from 'src/server/errors/FileNotExist'
import FileRepository from 'src/server/database/repository/FileRepository'

type ResponseData = File | { id: string } | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { query: { pid: fileId }, method, body } = req

	switch (method) {
	case 'GET':
		try {
			const file: File = await FileRepository.findById(fileId)
			if (!file) throw new FileNotExistError()

			return res.status(200).json(file)
		} catch (e) {
			const resp: ResponseData = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'PUT':
		try {
			const fileUpdated: File = await FileRepository.update(fileId, body)
			if (!fileUpdated) throw new FileNotExistError()

			return res.status(200).json(fileUpdated)
		} catch(e) {
			const resp: ResponseData = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'DELETE':
		try {
			const fileDeleted: File = await FileRepository.deleteById(fileId)
			if (!fileDeleted) throw new FileNotExistError()

			return res.status(200).json({ id: <string> fileId })
		} catch(e) {
			const resp: ResponseData = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}