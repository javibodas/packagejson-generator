import { User } from 'back/domain/User'
import UserModel from 'back/infrastructure/database/models/UserModel'
import databaseConnect from 'back/infrastructure/database'

databaseConnect()

const findAll = async (): Promise<Array<User>> => await UserModel.find()

const findById = async (id: string): Promise<User> => await UserModel.findById(id)

const create = async (user: User): Promise<User> => await (new UserModel(user)).save()

export default { findAll, findById, create }