import React from 'react'
import Keypad from 'components/Keypad'
import Form from 'components/Form';
import { JSONContextProvider } from 'context'
import { jsonInitialState } from 'state'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import 'jest-extended';

const mockGenerateURIJSONFile = jest.fn()
const mockExportJSONFile = jest.fn()
jest.mock('hooks/useJSONFile', () => {
    return jest.fn().mockImplementation(() => {
        return { generateURIJSONFile: mockGenerateURIJSONFile, exportJSONFile: mockExportJSONFile };
    });
})

describe('Keypad Test', () => {

    const wrapper = ({ children }) => {
        return (<JSONContextProvider>
                        {children}
                </JSONContextProvider>)
    }

    beforeEach(() => render(<React.Fragment> <Form /> <Keypad /> </React.Fragment>, {wrapper}) )
    afterEach(() => cleanup() )

    describe('When initial state', () => {

        beforeAll(() => { 
            jest.clearAllMocks()
        })
        
        it('should let export the file', () => {
            expect(screen.getByTestId('btn-exportjson')).toBeDefined()
            fireEvent.click(screen.getByTestId('btn-exportjson'))
            expect(mockExportJSONFile).toHaveBeenCalledTimes(1)
        })

        it('should share the json', () => {
            expect(screen.getByTestId('btn-generateuri')).toBeDefined()
            fireEvent.click(screen.getByTestId('btn-generateuri'))
            expect(mockGenerateURIJSONFile).toHaveBeenCalledTimes(1)
        })
    })

    describe('When all project data informed', () => {

        const projectName = 'Test project';
        const projectAuthor = 'Pepe';
        const projectVersion = '2.3.4';

        beforeAll(() => jest.clearAllMocks())

        it('should let export the file', () => {
            screen.getByTestId('form-name').value = projectName
            screen.getByTestId('form-author').value = projectAuthor
            screen.getByTestId('form-version').value = projectVersion
            expect(screen.getByTestId('btn-exportjson')).toBeDefined()
            fireEvent.click(screen.getByTestId('btn-exportjson'))
            expect(mockExportJSONFile).toHaveBeenCalledTimes(1)
        })

        it('should share the json', () => {
            expect(screen.getByTestId('btn-generateuri')).toBeDefined()
            fireEvent.click(screen.getByTestId('btn-generateuri'))
            expect(mockGenerateURIJSONFile).toHaveBeenCalledTimes(1)
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

            expect(screen.getByTestId('form-name').value).toEqual(jsonInitialState.name)
            expect(screen.getByTestId('form-author').value).toEqual(jsonInitialState.author)
            expect(screen.getByTestId('form-version').value).toEqual(jsonInitialState.version)
        })
    })
})