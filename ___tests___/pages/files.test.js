import React from 'react'
import File from 'pages/files/[id]'
import { UserContextProvider } from 'src/client/context/user'
import { FILE_ID_EXAMPLE } from '___tests___/constants'
import { cleanup, render, screen, act, fireEvent } from '@testing-library/react'
import 'jest-extended'

const mockUpdateFile = jest.fn()

jest.mock('src/client/hooks/useFile', () => {
	return jest.fn().mockImplementation(() => {
		return { handleUpdateFile: mockUpdateFile }
	})
})

describe('File Page Test', () => {
	describe('When existing file loaded', () => {
		const file = { id: FILE_ID_EXAMPLE, json: { name: 'TestNameProject', version: '1.0.0' } }

		beforeEach(async () => {
			const user = { isLogged: false }

			await act(async () => render(
				<UserContextProvider value={user}>
					<File json={file.json} id={file.id}/> 
				</UserContextProvider>
			))
		})
		afterEach(() => cleanup())

		it('should appear "Update" button', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			expect(screen.getByTestId('btn-save').textContent).toEqual('Update')
		})

		it('should let update the file', () => {
			expect(screen.getByTestId('btn-save')).toBeDefined()
			fireEvent.click(screen.getByTestId('btn-save'))
			expect(mockUpdateFile).toHaveBeenCalledTimes(1)
			expect(mockUpdateFile).toHaveBeenCalledWith(file.id)
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