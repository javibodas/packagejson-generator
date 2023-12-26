import 'jest-extended'
import { FILE_ID_EXAMPLE } from '___tests___/constants'
import FileRepository from 'src/server/database/repository/FileRepository'
import filesController from 'pages/api/files'

jest.mock('src/server/database/repository/FileRepository', () => ({
	findAll: jest.fn(),
	create: jest.fn()
}))

const response = { statusCode: 200, body: '', setHeader: function() {}, status: function(code) { this.statusCode = code; return this }, end: function(body) { this.body = body }, json: function(body) { this.body = body } }

describe('Files Api Test', () => {
	it('When call to /files with not allowed method should return 405', async () => {
		await filesController({ method: 'PUT' }, response)
		expect(response.statusCode).toEqual(405)
	})

	it('When call to /files with GET should call to find all', async () => {
		await filesController({ method: 'GET' }, response)
		expect(response.statusCode).toEqual(200)
		expect(FileRepository.findAll).toHaveBeenCalledTimes(1)
	})

	it('When call to /files with POST should call to find all', async () => {
		const body = { id: FILE_ID_EXAMPLE, json: {}}
		await filesController({ method: 'POST', body }, response)
		expect(FileRepository.create).toHaveBeenCalledTimes(1)
		expect(FileRepository.create).toHaveBeenCalledWith(body)
	})
})