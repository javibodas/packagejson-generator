import React from 'react'
import Keypad from 'components/Keypad'
import Form from 'components/Form';
import { JSONContextProvider } from 'context'
import { jsonInitialState } from 'state'
import { server } from './setupWorkerAPI'
import { render, screen, waitFor, fireEvent, waitForElement } from '@testing-library/react'
import 'jest-extended';

describe('Keypad Test', () => {

    const wrapper = ({ children }) => {
        return (<JSONContextProvider>
                        {children}
                </JSONContextProvider>)
    }

    beforeEach(() => render(<React.Fragment> <Form /> <Keypad /> </React.Fragment>, {wrapper}) )
    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers() )
    afterAll(() => server.close() )

    describe('When initial state', () => {
        it('should doesnt let export the file', () => {
            expect(screen.getByTestId('btn-exportjson')).toBeDefined()

            fireEvent.click(screen.getByTestId('btn-exportjson'))
            expect(screen.getByTestId('error-fields-popup').textContent).toInclude('Project Name')
        })

        it('should doesnt share the json', () => {
            expect(screen.getByTestId('btn-generateuri')).toBeDefined()

            fireEvent.click(screen.getByTestId('btn-generateuri'))
            expect(screen.getByTestId('error-fields-popup').textContent).toInclude('Project Name')
        })
    })

    describe('When all data needed informed', () => {

        const projectName = 'Test project';
        const projectAuthor = 'Pepe';
        const projectVersion = '2.3.4';


        beforeEach(() => {
            screen.getByTestId('form-name').value = projectName
            screen.getByTestId('form-author').value = projectAuthor
            screen.getByTestId('form-version').value = projectVersion
        })
        
        it('should let export the file', () => {
            expect(screen.getByTestId('btn-exportjson')).toBeDefined()
        })

        it('should share the json', async () => {
            expect(screen.getByTestId('btn-generateuri')).toBeDefined()

        })
    })

    describe('When clear button pressed', () => {

        const projectName = 'Test project';
        const projectAuthor = 'Pepe';
        const projectVersion = '2.3.4';


        beforeEach(() => {
            screen.getByTestId('form-name').value = projectName
            screen.getByTestId('form-author').value = projectAuthor
            screen.getByTestId('form-version').value = projectVersion
        })
        
        it('should left initial state', () => {
            expect(screen.getByTestId('form-name').value).toEqual(projectName)
            expect(screen.getByTestId('form-author').value).toEqual(projectAuthor)
            expect(screen.getByTestId('form-version').value).toEqual(projectVersion)

            fireEvent.click(screen.getByTestId('btn-clear'))

            expect(screen.getByTestId('form-name').value).toEqual('')
            expect(screen.getByTestId('form-author').value).toEqual('')
            expect(screen.getByTestId('form-version').value).toEqual(jsonInitialState.version)
        })
    })
})