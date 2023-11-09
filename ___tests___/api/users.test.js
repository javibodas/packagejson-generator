import usersController from 'pages/api/users'
import UserRepository from 'src/server/database/repository/UserRepository'
import { USER_ID_EXAMPLE } from '___tests___/constants'
import 'jest-extended'

jest.mock('src/server/database/repository/UserRepository', () => ({
	findAll: jest.fn(),
	create: jest.fn()
}))

const response = { statusCode: 200, body: '', setHeader: function() {}, status: function(code) { this.statusCode = code; return this }, end: function(body) { this.body = body }, json: function(body) { this.body = body } }

describe('Files Api Test', () => {
	it('When call to /users with not allowed method should return 405', async () => {
		await usersController({ method: 'PUT' }, response)
		expect(response.statusCode).toEqual(405)
	})

	it('When call to /users with GET should call to find all', async () => {
		await usersController({ method: 'GET' }, response)
		expect(response.statusCode).toEqual(200)
		expect(UserRepository.findAll).toHaveBeenCalledTimes(1)
	})

	it('When call to /users with POST should call to create', async () => {
		const body = { id: USER_ID_EXAMPLE}
		await usersController({ method: 'POST', body }, response)
		expect(UserRepository.create).toHaveBeenCalledTimes(1)
		expect(UserRepository.create).toHaveBeenCalledWith(USER_ID_EXAMPLE)
	})
})