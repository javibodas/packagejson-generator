import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from 'src/types/User'
import UserRepository from 'src/server/database/repository/UserRepository'

type ResponseData = User | Array<User> | { error: string }

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void | NextApiResponse> {
	const { body, method } = req

	switch (method) {
	case 'GET':
		try {
			const users: Array<User> = await UserRepository.findAll()

			return res.status(200).json(users)
		} catch (e) {
			return res.status(500).json({ error: e.nessage })
		}
	case 'POST':
		try {
			const userCreated: User = await UserRepository.create(body.id)

			return res.status(200).json(userCreated)
		} catch (e) {
			return res.status(500).json({ error: e.message })
		}
	default:
		res.setHeader('Allow', ['GET', 'POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}
