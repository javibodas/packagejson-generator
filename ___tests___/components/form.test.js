import 'jest-extended'
import { FileContextProvider } from 'front/state/file'
import { UserContextProvider } from 'front/state/user'
import { fileInitialState } from 'front/state/file/initialState'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Form from 'front/components/Form'
import React from 'react'

describe('Form Test', () => {

	const wrapper = ({ children }) => {
		return (<UserContextProvider>
			<FileContextProvider>
				{children}
			</FileContextProvider>
		</UserContextProvider>)
	}

	beforeEach(() => render(<Form />, {wrapper}) )

	describe('When initial load', () => {
		it('should have default context values in form', () => {
			Object.keys(fileInitialState.json).map((key) => {
				if(typeof fileInitialState.json[key] === 'string'){
					const input = screen.queryByTestId('form-' + key)
					input ? expect(input.value).toBe(fileInitialState.json[key]) : null
				}
			})
            
		})
	})

	describe('When writing package in dependencies field', () => {
		const packageName = 'react'

		beforeEach(() => {
			screen.getByTestId('input-dependencies').value = ''
			screen.getByTestId('input-devDependencies').value = ''
		})

		it('should show packages list for dependencies', async () => {
			fireEvent.change(screen.getByTestId('input-dependencies'), {target: { value: packageName }})

			await waitFor(() => {
				expect(screen.queryByTestId('dependencies-list-item')).toBeDefined()
			})
		})

		it('should show packages list for devdependencies', async () => {
			fireEvent.change(screen.getByTestId('input-devDependencies'), {target: { value: packageName }})

			await waitFor(() => {
				expect(screen.queryByTestId('devDependencies-list-item')).toBeDefined()
			})
		})
	})

	describe('When adding script in form', () => {
		const scriptKey = 'test-jest'
		const scriptvalue = 'jest'

		beforeEach(() => {
			screen.getByTestId('script-key').value = ''
			screen.getByTestId('script-value').value = ''
		})

		it('should not add script to scripts list if script key is not filled', () => {
			screen.getByTestId('script-value').value = scriptvalue

			fireEvent.click(screen.getByTestId('script-add-btn'))
			expect(screen.getByTestId('scripts-list').textContent).not.toMatch(scriptKey)
			expect(screen.getByTestId('scripts-list').textContent).not.toMatch(scriptvalue)
		})

		it('should add script to scripts list if script key and script value are filled', () => {
			screen.getByTestId('script-key').value = scriptKey
			screen.getByTestId('script-value').value = scriptvalue

			fireEvent.click(screen.getByTestId('script-add-btn'))
			expect(screen.getByTestId('scripts-list').textContent).toMatch(scriptKey)
			expect(screen.getByTestId('scripts-list').textContent).toMatch(scriptvalue)
		})
	})
})
