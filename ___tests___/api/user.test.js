import 'jest-extended'
import { USER_ID_EXAMPLE } from '___tests___/constants'
import UserRepository from 'src/lib/database/repository/UserRepository'
import userController from 'src/pages/api/users/[id]'

jest.mock('src/lib/database/repository/UserRepository', () => ({
	findById: jest.fn().mockReturnValueOnce({ toObject: () => { return {}}})
}))

jest.mock('src/lib/database/repository/FileRepository', () => ({
	getFilesByUserId: jest.fn().mockReturnValueOnce([]),
}))

const response = { statusCode: 200, body: '', setHeader: function() {}, status: function(code) { this.statusCode = code; return this }, end: function(body) { this.body = body }, json: function(body) { this.body = body } }

describe('Files Api Test', () => {
	it('When call to /user with not allowed method should return 405', async () => {
		await userController({ method: 'PUT', query: { id : USER_ID_EXAMPLE }}, response)
		expect(response.statusCode).toEqual(405)
	})

	it('When call to /user with GET should call to find all', async () => {
		await userController({ method: 'GET', query: { id : USER_ID_EXAMPLE }}, response)
		expect(response.statusCode).toEqual(200)
		expect(UserRepository.findById).toHaveBeenCalledTimes(1)
		expect(UserRepository.findById).toHaveBeenCalledWith(USER_ID_EXAMPLE)
	})
})