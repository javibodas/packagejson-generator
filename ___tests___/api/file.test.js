import fileController from 'pages/api/files/[pid]'
import FileRepository from 'src/server/database/repository/FileRepository'
import { FILE_ID_EXAMPLE } from '___tests___/constants'
import 'jest-extended'

jest.mock('src/server/database/repository/FileRepository', () => ({
	findById: jest.fn().mockReturnValueOnce({}),
	update: jest.fn(),
	deleteById: jest.fn()
}))

const response = { statusCode: 200, body: '', setHeader: function() {}, status: function(code) { this.statusCode = code; return this }, end: function(body) { this.body = body }, json: function(body) { this.body = body } }

describe('File Api Test', () => {
	it('When call to /files/id with not allowed method should return 405', async () => {
		await fileController({ method: 'POST', query: { pid : FILE_ID_EXAMPLE } }, response)
		expect(response.statusCode).toEqual(405)
	})

	it('When call to /files/id with GET should call to find by id', async () => {
		await fileController({ method: 'GET', query: { pid : FILE_ID_EXAMPLE } }, response)
		expect(response.statusCode).toEqual(200)
		expect(FileRepository.findById).toHaveBeenCalledTimes(1)
		expect(FileRepository.findById).toHaveBeenCalledWith(FILE_ID_EXAMPLE)
	})

	it('When call to /files/id with PUT should call to update', async () => {
		const body = { id: FILE_ID_EXAMPLE, json: {}}
		await fileController({ method: 'PUT', query: { pid : FILE_ID_EXAMPLE }, body }, response)
		expect(FileRepository.update).toHaveBeenCalledTimes(1)
		expect(FileRepository.update).toHaveBeenCalledWith(FILE_ID_EXAMPLE, body)
	})

	it('When call to /files/id with DELETE should call to delete by id', async () => {
		await fileController({ method: 'DELETE', query: { pid : FILE_ID_EXAMPLE }}, response)
		expect(FileRepository.deleteById).toHaveBeenCalledTimes(1)
		expect(FileRepository.deleteById).toHaveBeenCalledWith(FILE_ID_EXAMPLE)
	})
})