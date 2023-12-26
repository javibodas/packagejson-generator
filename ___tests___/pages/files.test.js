import 'jest-extended'
import { FILE_ID_EXAMPLE, USER_ID_EXAMPLE } from '___tests___/constants'
import { UserContextProvider } from 'src/client/context/user'
import { act, cleanup, render, screen } from '@testing-library/react'
import File from 'pages/files/[id]'
import React from 'react'

const mockUpdateFile = jest.fn()

jest.mock('src/client/hooks/useFile', () => {
	return jest.fn().mockImplementation(() => {
		return { handleUpdateFile: mockUpdateFile }
	})
})

describe('File Page Test', () => {
	describe('When existing file loaded but user is not logged', () => {
		const file = { id: FILE_ID_EXAMPLE, json: { name: 'TestNameProject', version: '1.0.0' } }
		const user = undefined

		beforeEach(async () => {
			await act(async () => render(
				<UserContextProvider value={user}>
					<File file={file} />
				</UserContextProvider>
			))
		})
		afterEach(() => cleanup())

		it('should not appear "Update" not "Clear" button', () => {
			expect(screen.queryByTestId('btn-save')).toBeNull()
			expect(screen.queryByTestId('btn-save')).toBeNull()
		})

		it('should appear file values in form', () => {
			Object.keys(file.json).map((key) => {
				if(typeof file.json[key] === 'string'){
					expect(screen.getByTestId('form-' + key)).toBeDefined()
					const input = screen.getByTestId('form-' + key)
					expect(input.value).toBe(file.json[key])
				}
			})
		})
	})

	describe('When existing file loaded and user is logged but not owner', () => {
		const file = { id: FILE_ID_EXAMPLE, createdBy: 'USER_NOT_OWNER', json: { name: 'TestNameProject', version: '1.0.0', scripts: {} } }
		const user = { id: USER_ID_EXAMPLE }

		beforeEach(async () => {
			await act(async () => render(
				<UserContextProvider value={user}>
					<File file={file} /> 
				</UserContextProvider>
			))
		})
		afterEach(() => cleanup())

		it('should not appear "Update" not "Clear" button', () => {
			expect(screen.queryByTestId('btn-save')).toBeNull()
			expect(screen.queryByTestId('btn-save')).toBeNull()
		})

		it('should appear file values in form', () => {
			Object.keys(file.json).map((key) => {
				if(typeof file.json[key] === 'string'){
					expect(screen.getByTestId('form-' + key)).toBeDefined()
					const input = screen.getByTestId('form-' + key)
					expect(input.value).toBe(file.json[key])
				}
			})
		})
	})

	describe('When existing file loaded and user is logged and owner', () => {
		const file = { id: FILE_ID_EXAMPLE, createdBy: USER_ID_EXAMPLE, json: { name: 'TestNameProject', version: '1.0.0', scripts: {}, author: 'TestAuthor' } }
		const user = { id: USER_ID_EXAMPLE }

		beforeEach(async () => {
			await act(async () => render(
				<UserContextProvider value={user}>
					<File file={file} /> 
				</UserContextProvider>
			))
		})
		afterEach(() => cleanup())

		it('should appear "Update" and "Clear" button', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			expect(screen.getByTestId('btn-save')).toBeDefined()
		})

		it('should appear file values in form', () => {
			Object.keys(file.json).map((key) => {
				if(typeof file.json[key] === 'string'){
					expect(screen.getByTestId('form-' + key)).toBeDefined()
					const input = screen.getByTestId('form-' + key)
					expect(input.value).toBe(file.json[key])
				}
			})
		})
	})
})