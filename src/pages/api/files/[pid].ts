import { File } from 'src/lib/types/server/File'
import FileNotExistError from 'src/lib/errors/server/FileNotExist'
import FileRepository from 'src/lib/database/repository/FileRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = File | { id: string } | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { query: { pid: fileId}, method, body } = req

	switch (method) {
	case 'GET':
		try {
			const file: File = await FileRepository.findById(<string> fileId)
			if (!file) throw new FileNotExistError()

			return res.status(200).json(file)
		} catch (e) {
			const resp: ResponseData = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'PUT':
		try {
			const fileUpdated: File = await FileRepository.update(<string> fileId, <File> body)
			if (!fileUpdated) throw new FileNotExistError()

			return res.status(200).json(fileUpdated)
		} catch(e) {
			const resp: ResponseData = { error : e.message }

			if (e instanceof FileNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'DELETE':
		try {
			const fileDeleted: File = await FileRepository.deleteById(<string> fileId)
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