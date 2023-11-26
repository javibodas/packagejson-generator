import React from 'react'
import Container from 'src/client/components/Container'
import { FileContextProvider } from 'src/client/context/file'
import { UserContextProvider } from 'src/client/context/user'
import { fileInitialState } from 'src/client/state'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import 'jest-extended'

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
