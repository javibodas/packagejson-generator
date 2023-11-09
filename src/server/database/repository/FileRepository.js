import databaseConnect from 'src/server/database'
import File from 'src/server/database/models/File'

databaseConnect()

const findAll = async () => await File.find()

const findById = async (fileId) => await File.findById(fileId)

const existsBy = async (criteria) => await File.exists(criteria)

const update = async (fileId, file) => await File.findByIdAndUpdate(fileId, file, { new: true })

const deleteById = async (fileId) => await File.findByIdAndDelete(fileId)

const create = async (file) => await (new File(file)).save()

const getFilesByUserId = async (userId) => {
	const userFiles = await File.find({ createdBy: userId }).exec()

	return userFiles.map((file) => {
		const { _id, createdAt, json } = file
		const { name, version, description } = json
		
		return { id: _id, name, version, description, createdAt }
	})
}

export default { findAll, findById, existsBy, deleteById, getFilesByUserId, create, update }