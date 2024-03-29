import { User } from 'src/lib/types/server/User'
import UserNotExistError from 'src/lib/errors/server/UserNotExist'
import UserRepository from 'src/lib/database/repository/UserRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = User | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { query: { id: userId }, method } = req

	switch (method) {
	case 'GET':
		try {
			const user: User = await UserRepository.findById(<string> userId)
			if(!user) throw new UserNotExistError()

			return res.status(200).json(user)
		} catch (e) {
			const resp: ResponseData = { error: e.message }

			if (e instanceof UserNotExistError) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['GET'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}