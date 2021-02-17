import React from 'react'
import Form from 'components/Form'
import { FormJSONContextProvider } from 'context/formJsonContext'
import { TextEditorJSONContextProvider } from 'context/textEditorJsonContext'
import { JSON_FILE_OBJECT_DEFAULT } from 'context/DEFAULT_PKG_JSON'
import { server } from './setupWorkerAPI'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect' 

describe('Form Test', () => {

    const wrapper = ({ children }) => {
        return (<TextEditorJSONContextProvider>
                    <FormJSONContextProvider>
                        {children}
                    </FormJSONContextProvider>
                </TextEditorJSONContextProvider>)
    }

    beforeEach(() => render(<Form />, {wrapper}) )
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers() )
    afterAll(() => server.close() )

    describe('When initial load', () => {
        it('should have default context values', () => {
            Object.keys(JSON_FILE_OBJECT_DEFAULT).map((key) => {
                if(typeof JSON_FILE_OBJECT_DEFAULT[key] === 'string'){
                    const input = screen.queryByTestId('form-' + key)
                    input ?
                        expect(input.value).toBe(JSON_FILE_OBJECT_DEFAULT[key])
                    :
                        null
                }
            })
            
        })
    })

    describe('When typing package in dependencie input', () => {
        it('should show packages list', async () => {

            const packageName = 'testing...'
            fireEvent.change(screen.getByTestId('input-dependencies'), {target: { value: packageName }})

            await waitFor(() => { 
                expect(screen.getByTestId('combo-dependencies')).toHaveTextContent(packageName) 
            })
        })
    })

    describe('When typing package in devdependencie input', () => {
        it('should show packages list', async () => {

            const packageName = 'testing...'
            fireEvent.change(screen.getByTestId('input-devDependencies'), {target: { value: packageName }})

            await waitFor(() => { 
                expect(screen.getByTestId('combo-devDependencies')).toHaveTextContent(packageName) 
            })
        })
    })

    describe('When selecting package in dependencies combo', () => {
        const packageName = 'testing...'

        beforeEach( async () => {
            fireEvent.change(screen.getByTestId('input-dependencies'), {target: { value: packageName }})

            await waitFor(() => { 
                expect(screen.queryByTestId('dependencies-list-item')).toBeDefined()
                fireEvent.click(screen.getByTestId('dependencies-list-item'), {target : { innerText: packageName}})
            })
        })

        it('should add package to dependencies list', () => {
            expect(screen.getByTestId('dependencies-list')).toHaveTextContent(packageName)
        })

        it('should not add package to dependencies list if already exist', () => {
            expect(screen.getByTestId('dependencies-list')).toHaveTextContent(packageName)
        })
    })

    describe('When selecting package in devdependencies combo', () => {
        const packageName = 'testing...'
        
        beforeEach( async () => {
            fireEvent.change(screen.getByTestId('input-devDependencies'), {target: { value: packageName }})

            await waitFor(() => { 
                expect(screen.queryByTestId('devDependencies-list-item')).toBeDefined()
                fireEvent.click(screen.getByTestId('devDependencies-list-item'), {target : { innerText: packageName}})
            })
        })

        it('should add package to devdependencies list', async () => {
            expect(screen.getByTestId('devDependencies-list')).toHaveTextContent(packageName)
        })

        it('should not add package to devdependencies list if already exist', async () => {
            expect(screen.getByTestId('devDependencies-list')).toHaveTextContent(packageName)
        })
    })

    describe('When clicking add script', () => {
        const scriptKeyAlreadyExist = 'test'
        const scriptKey = 'test-jest'
        const scriptvalue = 'jest'

        it('should not add script to scripts list if key is empty', () => {
           
            screen.getByTestId('script-value').value = scriptvalue

            fireEvent.click(screen.getByTestId('script-add-btn'))
            expect(screen.getByTestId('scripts-list')).not.toHaveTextContent(scriptvalue)
        })

        it('should not add script to scripts list if value is empty', () => {

            screen.getByTestId('script-key').value = scriptKey

            fireEvent.click(screen.getByTestId('script-add-btn'))
            expect(screen.getByTestId('scripts-list')).not.toHaveTextContent(scriptKey)
        })

        it('should not add script to scripts list if script key already exist', () => {

            screen.getByTestId('script-key').value = scriptKeyAlreadyExist
            screen.getByTestId('script-value').value = scriptvalue

            fireEvent.click(screen.getByTestId('script-add-btn'))
            expect(screen.getByTestId('scripts-list')).not.toHaveTextContent(scriptvalue)
        })

        it('should add script to scripts list if key and value is not empty and not exist', () => {

            screen.getByTestId('script-key').value = scriptKey
            screen.getByTestId('script-value').value = scriptvalue

            fireEvent.click(screen.getByTestId('script-add-btn'))
            expect(screen.getByTestId('scripts-list')).toHaveTextContent(scriptKey)
            expect(screen.getByTestId('scripts-list')).toHaveTextContent(scriptvalue)
        })
    })
})

