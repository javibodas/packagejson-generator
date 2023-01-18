import React from 'react'
import Container from 'src/components/Container'
import { FileContextProvider } from 'src/context/file'
import { UserContextProvider } from 'src/context/user'
import { fileInitialState } from 'src/state'
import { server } from './setupWorkerAPI'
import { render, screen, waitFor, fireEvent, cleanup } from '@testing-library/react'
import 'jest-extended'

describe('Container Test', () => {

    const wrapper = ({ children }) => {
        return (<UserContextProvider>
                    <FileContextProvider>
                        {children}
                    </FileContextProvider>
                </UserContextProvider>)
    }

    
    beforeAll(() => server.listen())
    afterAll(() => server.close() )
    beforeEach(() => render(<Container />, {wrapper}))
    afterEach(() => {
        server.resetHandlers() 
        cleanup()
    })

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

    describe('When selecting package in dependencies combo ', () => {
        const packageName = 'react'
        
        beforeEach(async () => {
            fireEvent.change(screen.getByTestId('input-dependencies'), {target: { value: packageName }})

            await waitFor(() => {
                expect(screen.queryByTestId('dependencies-list-item')).toBeDefined()
                fireEvent.click(screen.getByTestId('dependencies-list-item'), {target : { innerText: packageName}})
            })
        })

        it('should add package to dependencies list and text editor content', () => {
            expect(screen.getByTestId('dependencies-list').textContent).toInclude(packageName)
        })
    })

    describe('When adding script in form', () => {
        const scriptKey = 'test-jest'
        const scriptvalue = 'jest'

        it('should add script to scripts list and text editor content', () => {
            screen.getByTestId('script-key').value = scriptKey
            screen.getByTestId('script-value').value = scriptvalue

            fireEvent.click(screen.getByTestId('script-add-btn'))
            expect(screen.getByTestId('scripts-list').textContent).toInclude(scriptKey)
            expect(screen.getByTestId('scripts-list').textContent).toInclude(scriptvalue)
        })
    })
})
