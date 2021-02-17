import React from 'react'
import ReactDOM from 'react-dom'
import { getQueriesForElement } from '@testing-library/dom'
import Header from '../components/Header'


const render = (component) => {
    const root = document.createElement('div')
    ReactDOM.render(component, root)
    return  getQueriesForElement(root) 
}

describe('Header Test', () => {

    describe('When initial load', () => {
        
        it('should show title header', () => {
            const { getByText } = render(<Header />)

            getByText('Packagejson generator')
        })
    })
})

