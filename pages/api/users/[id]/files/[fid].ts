import type { NextApiRequest, NextApiResponse } from 'next'
import { File } from 'src/types/File'
import FileDoesntBelongToUserError from 'src/server/errors/FileDoesntBelongToUser'
import FileNotExistError from 'src/server/errors/FileNotExist'
import FileRepository from 'src/server/database/repository/FileRepository'
import { User } from 'src/types/User'
import UserNotExistError from 'src/server/errors/UserNotExist'
import UserRepository from 'src/server/database/repository/UserRepository'

type ResponseData = { id: string } | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { query: { id: userId, fid: fileId }, method } = req

	switch (method) {
	case 'DELETE':
		try {
			const user: User = await UserRepository.findById(userId)
			const file: File = await FileRepository.findById(fileId)

			if (!file) throw new FileNotExistError()
			if (!user) throw new UserNotExistError()
			if (!fileBelongsToUser(<string> fileId, <string> userId)) throw new FileDoesntBelongToUserError()
			
			await FileRepository.deleteById(fileId)

			res.status(200).json({ id: <string> fileId })
		} catch (e) {
			const resp: ResponseData = { error: e.message }
            
			if (e instanceof UserNotExistError || e instanceof FileNotExistError) res.status(404).json(resp)
			else if (e instanceof FileDoesntBelongToUserError) res.status(401).json(resp)
			else res.status(500).json(resp)
		}
		break
	default:
		res.setHeader('Allow', ['DELETE'])
		res.status(405).end(`Method ${method} Not Allowed`)
	}
}

const fileBelongsToUser = function(fileId: string, userId: string): Promise<{ _id: string }> {
	return FileRepository.existsBy({ id: fileId, createdBy: userId })
}