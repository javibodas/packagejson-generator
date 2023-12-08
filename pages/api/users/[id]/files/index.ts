import type { NextApiRequest, NextApiResponse } from 'next'
import { File } from 'src/types/File'
import FileRepository from 'src/server/database/repository/FileRepository'
import { User } from 'src/types/User'
import UserNotExistError from 'src/server/errors/UserNotExist'
import UserRepository from 'src/server/database/repository/UserRepository'

type ResponseData = File | Array<File> | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { query: { id }, method, body } = req

	switch (method) {
	case 'GET':
		try {
			const user: User = await UserRepository.findById(id)
			if (!user) throw new UserNotExistError()

			const files: Array<File> = await FileRepository.getFilesByUserId(id)

			return res.status(200).json(files)
		} catch (e) {
			const resp: ResponseData = { error: e.message }
            
			if (e instanceof UserNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'POST':
		try {
			const user: User = await UserRepository.findById(id)
			if (!user) throw new UserNotExistError()
			
			const file: File = await FileRepository.create(body)
			
			return res.status(200).json(file)
		} catch (e) {
			const resp: ResponseData = { error: e.message }
            
			if (e instanceof UserNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}