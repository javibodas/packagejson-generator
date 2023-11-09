import databaseConnect from 'src/server/database'
import User from 'src/server/database/models/User'

databaseConnect()

const findAll = async () => await User.find()

const findById = async (userId) => await User.findById(userId)

const create = async (userId) => {
	const user = new User({ _id: userId })
	
	return await user.save()
}

export default { findAll, findById, create }