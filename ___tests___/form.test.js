import React from 'react'
import Form from 'components/Form'
import { JSONContextProvider } from 'context'
import { jsonInitialState } from 'state'
import { server } from './setupWorkerAPI'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import 'jest-extended';

describe('Form Test', () => {

    const wrapper = ({ children }) => {
        return (<JSONContextProvider>
                        {children}
                </JSONContextProvider>)
    }

    beforeEach(() => render(<Form />, {wrapper}) )
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers() )
    afterAll(() => server.close() )

    describe('When initial load', () => {
        it('should have default context values in form', () => {
            Object.keys(jsonInitialState).map((key) => {
                if(typeof jsonInitialState[key] === 'string'){
                    const input = screen.queryByTestId('form-' + key)
                    input ? expect(input.value).toBe(jsonInitialState[key]) : null
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

    describe('When selecting package in packages list of dependencies combo', () => {
        const packageName = 'react'
        
        beforeEach(async () => {
            fireEvent.change(screen.getByTestId('input-dependencies'), {target: { value: packageName }})

            await waitFor(() => {
                expect(screen.queryByTestId('dependencies-list-item')).toBeDefined()
                fireEvent.click(screen.getByTestId('dependencies-list-item'), {target : { innerText: packageName}})
            })
        })

        it('should add package to dependencies list', () => {
            expect(screen.getByTestId('dependencies-list').textContent).toInclude(packageName)
        })
    })

    describe('When selecting package in packages list of devDependencies combo', () => {
        const packageName = 'react'
        
        beforeEach(async () => {
            fireEvent.change(screen.getByTestId('input-devDependencies'), {target: { value: packageName }})

            await waitFor(() => {
                expect(screen.queryByTestId('devDependencies-list-item')).toBeDefined()
                fireEvent.click(screen.getByTestId('devDependencies-list-item'), {target : { innerText: packageName}})
            })
        })

        it('should add package to devdependencies list', () => {
            expect(screen.getByTestId('devDependencies-list').textContent).toInclude(packageName)
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
            expect(screen.getByTestId('scripts-list').textContent).not.toInclude(scriptKey)
            expect(screen.getByTestId('scripts-list').textContent).not.toInclude(scriptvalue)
        })

        it('should add script to scripts list if script key and script value are filled', () => {
            screen.getByTestId('script-key').value = scriptKey
            screen.getByTestId('script-value').value = scriptvalue

            fireEvent.click(screen.getByTestId('script-add-btn'))
            expect(screen.getByTestId('scripts-list').textContent).toInclude(scriptKey)
            expect(screen.getByTestId('scripts-list').textContent).toInclude(scriptvalue)
        })
    })
})