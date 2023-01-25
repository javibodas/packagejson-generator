import React from 'react'
import Keypad from 'src/client/components/Keypad'
import Form from 'src/client/components/Form'
import { FileContextProvider } from 'src/client/context/file'
import { UserContextProvider } from 'src/client/context/user'
import { fileInitialState } from 'src/client/state'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import 'jest-extended'

const mockSaveFile = jest.fn()
const mockExportFile = jest.fn()
const mockIsLogged = jest.fn(() => { return false })
const mockSaveUserFile = jest.fn()
jest.mock('src/client/hooks/useFile', () => {
	return jest.fn().mockImplementation(() => {
		return { handleCreateFile: mockSaveFile, exportFile: mockExportFile }
	})
})
jest.mock('src/client/hooks/useUser', () => {
	return jest.fn().mockImplementation(() => {
		return { isLogged: mockIsLogged, saveUserFile: mockSaveUserFile }
	})
})


describe('Keypad Test', () => {

	const wrapper = ({ children }) => {
		return (<UserContextProvider>
			<FileContextProvider>
				{children}
			</FileContextProvider>
		</UserContextProvider>)
	}

	beforeEach(() => render(<React.Fragment> <Form /> <Keypad /> </React.Fragment>, {wrapper}) )
	afterEach(() => cleanup() )

	describe('When initial state', () => {

		beforeAll(() => { 
			jest.clearAllMocks()
		})
        
		it('should let export the file', () => {
			expect(screen.getByTestId('btn-exportjson')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-exportjson'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})

		it('should share the json', () => {
			expect(screen.getByTestId('btn-generateuri')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-generateuri'))
			expect(mockSaveFile).toHaveBeenCalledTimes(1)
		})
	})

	describe('When all project data informed', () => {

		const projectName = 'Test project'
		const projectAuthor = 'Pepe'
		const projectVersion = '2.3.4'

		beforeAll(() => jest.clearAllMocks())

		it('should let export the file', () => {
			screen.getByTestId('form-name').value = projectName
			screen.getByTestId('form-author').value = projectAuthor
			screen.getByTestId('form-version').value = projectVersion
			expect(screen.getByTestId('btn-exportjson')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-exportjson'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})

		it('should share the json', () => {
			expect(screen.getByTestId('btn-generateuri')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-generateuri'))
			expect(mockSaveFile).toHaveBeenCalledTimes(1)
		})
	})

	describe('When clear button pressed', () => {

		const projectName = 'Test project'
		const projectAuthor = 'Pepe'
		const projectVersion = '2.3.4'


		beforeEach(() => {
			screen.getByTestId('form-name').value = projectName
			screen.getByTestId('form-author').value = projectAuthor
			screen.getByTestId('form-version').value = projectVersion
		})
        
		it('should left initial state', () => {
			expect(screen.getByTestId('form-name').value).toEqual(projectName)
			expect(screen.getByTestId('form-author').value).toEqual(projectAuthor)
			expect(screen.getByTestId('form-version').value).toEqual(projectVersion)

			fireEvent.click(screen.getByTestId('btn-clear'))

			expect(screen.getByTestId('form-name').value).toEqual(fileInitialState.json.name)
			expect(screen.getByTestId('form-author').value).toEqual(fileInitialState.json.author)
			expect(screen.getByTestId('form-version').value).toEqual(fileInitialState.json.version)
		})
	})
})