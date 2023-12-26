import { File } from 'src/server/types/File'
import { FileDetail } from 'src/server/types/FileDetail'
import { User } from 'src/server/types/User'
import FileRepository from 'src/server/database/repository/FileRepository'
import UserNotExistError from 'src/server/errors/UserNotExist'
import UserRepository from 'src/server/database/repository/UserRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = File | Array<File> | Array<FileDetail> | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { query: { id }, method, body } = req

	switch (method) {
	case 'GET':
		try {
			const user: User = await UserRepository.findById(<string> id)
			if (!user) throw new UserNotExistError()

			const files: Array<FileDetail> = await FileRepository.getFilesByUserId(<string> id)

			return res.status(200).json(files)
		} catch (e) {
			const resp: ResponseData = { error: e.message }
            
			if (e instanceof UserNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	case 'POST':
		try {
			const user: User = await UserRepository.findById(<string> id)
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