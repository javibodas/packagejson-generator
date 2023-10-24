import React from 'react'
import File from 'pages/files/[id]'
import { UserContextProvider } from 'src/client/context/user'
import { cleanup, render, screen, act, fireEvent } from '@testing-library/react'
import 'jest-extended'

const mockUpdateFile = jest.fn()

jest.mock('src/client/hooks/useFile', () => {
	return jest.fn().mockImplementation(() => {
		return { handleUpdateFile: mockUpdateFile }
	})
})

describe('File Test', () => {
	describe('When existing file loaded', () => {
		const fileJson = { name: 'TestNameProject', version: '1.0.0' }
		const fileId = '123'

		beforeEach(async () => {
			const user = { isLogged: false }

			await act(async () => render(
				<UserContextProvider value={user}>
					<File json={fileJson} id={fileId}/> 
				</UserContextProvider>
			))
		})
		afterEach(() => cleanup())

		it('should appear file values in form', () => {
			Object.keys(fileJson).map((key) => {
				if(typeof fileJson[key] === 'string'){
					expect(screen.getByTestId('form-' + key)).toBeDefined()
					const input = screen.getByTestId('form-' + key)
					expect(input.value).toBe(fileJson[key])
				}
			})
		})
	})
})