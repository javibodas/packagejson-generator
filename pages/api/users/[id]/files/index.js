import databaseConnect from 'src/server/database'
import User from 'src/server/models/User'
import File from 'src/server/models/File'
import UserNotExist from 'src/server/errors/UserNotExist'

databaseConnect()

export default async function handler(req, res) {
	const { query: { id }, method, body } = req

	switch (method) {
	case 'POST':
		try {
			const user = await User.findById(id)
			if (!user) throw new UserNotExist()
			
			const file = new File({ json: body })
			await file.save()

			await User.findByIdAndUpdate(id, { $addToSet: { files: file._id.toString() } })
			
			return res.status(200).json({ id: file._id })
		} catch (e) {
			const resp = { error: e.message }
            
			if (e instanceof UserNotExist) return res.status(404).json(resp)
			else return res.status(500).json(resp)
		}
	default:
		res.setHeader('Allow', ['POST'])
		return res.status(405).end(`Method ${method} Not Allowed`)
	}
}