import 'jest-extended'
import { UserContextProvider } from 'src/context/user'
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import React from 'react'
import User from 'src/pages/users/[id]'

const mockDeleteUserFile = jest.fn()
const mockPushRouter = jest.fn()

jest.mock('next/router', () => ({
	useRouter() {
		return {
			push: mockPushRouter
		}
	},
}))

jest.mock('src/hooks/useUser', () => {
	return jest.fn().mockImplementation(() => {
		return { deleteFile: mockDeleteUserFile }
	})
})

describe('User Page Test', () => {
	describe('When user does not have files saved', () => {
		beforeEach(() => {
			const userFiles = []
			const user = { isLogged: false }

			render(
				<UserContextProvider value={user}> 
					<User filesApi={userFiles} /> 
				</UserContextProvider>
			)
		})
		beforeAll(() => jest.clearAllMocks())
		afterEach(() => cleanup())

		it('should appear new file button', async () => {
			expect(screen.getByTestId('file-new')).toBeDefined()
		})

		it('should should let open new file', async () => {
			expect(screen.getByTestId('file-new')).toBeDefined()
			fireEvent.click(screen.getByTestId('file-new'))
			expect(mockPushRouter).toHaveBeenCalledWith('/')
		})

		it('should not appear user files', () => {
			const userFiles = screen.queryAllByTestId(/^file-saved/)
			expect(userFiles.length).toEqual(0)
		})
	})

	describe('When user have files saved', () => {
		const userFiles = [ 
			{ id: '123', name: 'TestFile', version: '1.0.0', description: 'Testing user file...', createdAt: '01/01/01' },
			{ id: '456', name: 'TestFile2', version: '1.0.1', description: 'Testing user file2...', createdAt: '01/01/03' }
		]
		const user = { isLogged: false }
		beforeEach(() => {
			jest.clearAllMocks()
			render(
				<UserContextProvider value={user}> 
					<User filesApi={userFiles} /> 
				</UserContextProvider>
			)
		})
		afterEach(() => cleanup())

		it('should appear new file button', async () => {
			expect(screen.getByTestId('file-new')).toBeDefined()
		})

		it('should should let open new file', async () => {
			expect(screen.getByTestId('file-new')).toBeDefined()
			fireEvent.click(screen.getByTestId('file-new'))
			expect(mockPushRouter).toHaveBeenCalledWith('/')
		})

		it('should appear user files', () => {
			expect(screen.queryAllByTestId(/^file-saved/).length).toEqual(userFiles.length)

			userFiles.forEach(file => {
				const fileElement = screen.getByTestId(`file-saved-${file.id}`)
				expect(within(fileElement).getByTestId('file-title').textContent).toEqual(file.name)
				expect(within(fileElement).getByTestId('file-version').textContent).toEqual(file.version)
			})
		})

		it('should let delete saved files', () => {
			userFiles.forEach(file => {
				expect(screen.getByTestId(`btn-delete-file-saved-${file.id}`)).toBeDefined()
				fireEvent.click(screen.getByTestId(`btn-delete-file-saved-${file.id}`))
				expect(mockDeleteUserFile).toHaveBeenCalledWith(file.id)
			})

			expect(mockDeleteUserFile).toHaveBeenCalledTimes(userFiles.length)
		})

		it('should let open file saved after click', () => {
			userFiles.forEach(file => {
				expect(screen.getByTestId(`file-saved-${file.id}`)).toBeDefined()
				fireEvent.click(screen.getByTestId(`file-saved-${file.id}`))
				expect(mockPushRouter).toHaveBeenCalledWith('/files/' + file.id)
			})

			expect(mockPushRouter).toHaveBeenCalledTimes(userFiles.length)
		})
	})
})