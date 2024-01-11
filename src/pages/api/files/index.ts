import { File } from 'src/lib/types/server/File'
import FileRepository from 'src/lib/database/repository/FileRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = File | { files: Array<File> } | { error: string}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { method, body } = req

	switch (method) {
	case 'GET':
		try {
			const files: Array<File> = await FileRepository.findAll()

			return res.status(200).json({ files })
		} catch(e) {
			return res.status(500).json({ error: e.message })
		}
	case 'POST':
		try {
			const file: File = await FileRepository.create(body)
				
			return res.status(200).json(file)
		} catch (e) {
			return res.status(500).json({ error: e.message })
		}
	default:
		res.setHeader('Allow', ['GET', 'POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}