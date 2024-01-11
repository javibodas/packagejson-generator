import { User } from 'src/lib/types/server/User'
import UserModel from 'src/lib/database/models/UserModel'
import databaseConnect from 'src/lib/database'

databaseConnect()

const findAll = async (): Promise<Array<User>> => await UserModel.find()

const findById = async (id: string): Promise<User> => await UserModel.findById(id)

const create = async (user: User): Promise<User> => await (new UserModel(user)).save()

export default { findAll, findById, create }