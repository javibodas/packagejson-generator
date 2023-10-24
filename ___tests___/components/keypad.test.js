import React from 'react'
import Keypad from 'src/client/components/Keypad'
import { FileContextProvider } from 'src/client/context/file'
import { UserContextProvider } from 'src/client/context/user'
import { fileInitialState } from 'src/client/state'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import 'jest-extended'

const mockSaveFile = jest.fn()
const mockSaveUserFile = jest.fn()
const mockUpdateFile = jest.fn()
const mockExportFile = jest.fn()

jest.mock('src/client/hooks/useFile', () => {
	return jest.fn().mockImplementation(() => {
		return { handleCreateFile: mockSaveFile, exportFile: mockExportFile, handleUpdateFile: mockUpdateFile }
	})
})
jest.mock('src/client/hooks/useUser', () => {
	return jest.fn().mockImplementation(() => {
		return { saveUserFile: mockSaveUserFile }
	})
})


describe('Keypad Test', () => {

	beforeEach(() => jest.clearAllMocks())

	describe('When user is not logged and file does not exist', () => {
		beforeEach(() => {
			const user = {isLogged: false}
			render(
				<UserContextProvider value={user}>
					<FileContextProvider>  
						<Keypad /> 
					</FileContextProvider>
				</UserContextProvider>
			)
		})
		afterEach(() => cleanup() )

		it('should appear share button', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			expect(screen.getByTestId('btn-save').textContent).toEqual('Share')
		})
        
		it('should let export the file', () => {
			expect(screen.getByTestId('btn-export')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-export'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})

		it('should let share the file', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-save'))
			expect(mockSaveFile).toHaveBeenCalledTimes(1)
		})

		it('should let clear the file', () => {
			expect(screen.getByTestId('btn-clear')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-clear'))
		})
	})

	describe('When user is not logged and file exist but doesnt have owner', () => {
		beforeEach(() => {
			const user = {isLogged: false}
			const file = {id: 'file-id'}
			render(
				<UserContextProvider value={user}>
					<FileContextProvider value={file}>  
						<Keypad /> 
					</FileContextProvider>
				</UserContextProvider>
			)
		})
		afterEach(() => cleanup() )

		it('should not appear share button', () => {
			expect(screen.queryByTestId('btn-save')).toBeNull()
		})

		it('should not appear clear button', () => {
			expect(screen.queryByTestId('btn-clear')).toBeNull()
		})
        
		it('should let export the file', () => {
			expect(screen.getByTestId('btn-export')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-export'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})
	})

	describe('When user is not logged and file exist but it has owner', () => {
		beforeEach(() => {
			const user = {isLogged: false}
			const file = { id: 'file-id', createdBy: 'user-owner-id'}
			render(
				<UserContextProvider value={user}>
					<FileContextProvider value={file}>  
						<Keypad /> 
					</FileContextProvider>
				</UserContextProvider>
			)
		})
		afterEach(() => cleanup() )

		it('should not appear share button', () => {
			expect(screen.queryByTestId('btn-save')).toBeNull()
		})

		it('should not appear clear button', () => {
			expect(screen.queryByTestId('btn-clear')).toBeNull()
		})
        
		it('should let export the file', () => {
			expect(screen.getByTestId('btn-export')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-export'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})
	})

	describe('When user is logged and file does not exist', () => {
		beforeEach(() => {
			const user = {isLogged: true}
			render(
				<UserContextProvider value={user}>
					<FileContextProvider>  
						<Keypad /> 
					</FileContextProvider>
				</UserContextProvider>
			)
		})
		afterEach(() => cleanup())

		it('should appear save button', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			expect(screen.getByTestId('btn-save').textContent).toEqual('Save')
		})

		it('should let export the file', () => {
			expect(screen.getByTestId('btn-export')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-export'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})

		it('should let save the file into the user', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-save'))
			expect(mockSaveUserFile).toHaveBeenCalledTimes(1)
			expect(mockSaveUserFile).toHaveBeenCalledWith(fileInitialState.json)
		})

		it('should let clear the file', () => {
			expect(screen.getByTestId('btn-clear')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-clear'))
		})
	})

	describe('When user is logged and file exist but is not owned by current user', () => {
		const file = { id: 'file-id', createdBy: 'not-current-user-id' }
		const user = { isLogged: true, uid: 'user-id' }
		beforeEach(() => {
			render(
				<UserContextProvider value={user}>
					<FileContextProvider value={file}>
						<Keypad /> 
					</FileContextProvider>
				</UserContextProvider>
			)
		})
		afterEach(() => cleanup())

		it('should not appear update button', () => {
			expect(screen.queryByTestId('btn-save')).toBeNull()
		})

		it('should let export the file', () => {
			expect(screen.getByTestId('btn-export')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-export'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})

		it('should not appear clear the file', () => {
			expect(screen.queryByTestId('btn-clear')).toBeNull()
		})
	})

	describe('When user is logged and file exist and is owned by current user', () => {
		const file = { id: 'file-id', createdBy: 'user-id' }
		const user = { isLogged: true, uid: 'user-id' }
		beforeEach(() => {
			render(
				<UserContextProvider value={user}>
					<FileContextProvider value={file}>
						<Keypad /> 
					</FileContextProvider>
				</UserContextProvider>
			)
		})
		afterEach(() => cleanup())

		it('should appear update button', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			expect(screen.getByTestId('btn-save').textContent).toEqual('Update')
		})

		it('should let export the file', () => {
			expect(screen.getByTestId('btn-export')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-export'))
			expect(mockExportFile).toHaveBeenCalledTimes(1)
		})

		it('should let update the file', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-save'))
			expect(mockUpdateFile).toHaveBeenCalledTimes(1)
			expect(mockUpdateFile).toHaveBeenCalledWith(file.id)
		})

		it('should let clear the file', () => {
			expect(screen.getByTestId('btn-clear')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-clear'))
		})
	})
})