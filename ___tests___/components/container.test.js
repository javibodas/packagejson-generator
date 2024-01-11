import 'jest-extended'
import { FileContextProvider } from 'src/context/file'
import { UserContextProvider } from 'src/context/user'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { fileInitialState } from 'src/lib/state'
import Container from 'src/components/Container'
import React from 'react'

jest.mock('src/lib/firebase/firebase', () => {
	return jest.fn().mockImplementation(() => {
		return { firebaseApp: {}, auth: {} }
	})
})

describe('Container Test', () => {

	const wrapper = ({ children }) => {
		return (<UserContextProvider>
			<FileContextProvider>
				{children}
			</FileContextProvider>
		</UserContextProvider>)
	}

	beforeEach(() => render(<Container />, {wrapper}))
	afterEach(() => cleanup())

	describe('When initial load', () => {
		it('should have default context values in form and texteditor', async () => {
			Object.keys(fileInitialState.json).map((key) => {
				if(typeof fileInitialState.json[key] === 'string'){
					const input = screen.queryByTestId('form-' + key)
					input ? expect(input.value).toBe(fileInitialState.json[key]) : null
				}
			})
            
		})
	})

	describe('When adding script in form', () => {
		const scriptKey = 'test-jest'
		const scriptvalue = 'jest'

		it('should add script to scripts list and text editor content', () => {
			screen.getByTestId('script-key').value = scriptKey
			screen.getByTestId('script-value').value = scriptvalue

			fireEvent.click(screen.getByTestId('script-add-btn'))
			expect(screen.getByTestId('scripts-list').textContent).toMatch(scriptKey)
			expect(screen.getByTestId('scripts-list').textContent).toMatch(scriptvalue)
		})
	})
})
