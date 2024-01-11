import { File } from 'src/lib/types/server/File'
import { FileDetail } from 'src/lib/types/FileDetail'
import { FilterQuery } from 'mongoose'
import FileModel from 'src/lib/database/models/FileModel'
import databaseConnect from 'src/lib/database'

databaseConnect()

const findAll = async (): Promise<Array<File>> => await FileModel.find()

const findById = async (id: string): Promise<File> => await FileModel.findById(id)

const existsBy = async (criteria: FilterQuery<any>): Promise<any> => await FileModel.exists(criteria)

const update = async (id: string, file: File): Promise<File> => await FileModel.findByIdAndUpdate(id, file, { new: true })

const deleteById = async (id: string): Promise<File> => await FileModel.findByIdAndDelete(id)

const create = async (file: File): Promise<File> => await (new FileModel(file)).save()

const getFilesByUserId = async (userId: string): Promise<Array<FileDetail>> => {
	const userFiles = await FileModel.find({ createdBy: userId }).exec()

	return userFiles.map((file) => {
		const { id, createdAt, json } = file
		const { name, version, description } = json
		
		return <FileDetail> { id, name, version, description, createdAt }
	})
}

export default { findAll, findById, existsBy, deleteById, getFilesByUserId, create, update }