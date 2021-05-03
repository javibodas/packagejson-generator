import React from 'react'
import Container from 'components/Container'
import { JSON_FILE_OBJECT_DEFAULT } from 'context/DEFAULT_PKG_JSON'
import { server } from './setupWorkerAPI'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import 'node_modules/jest-extended'

describe('Container Test', () => {
  beforeEach(() => render(<Container />))
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('When initial load', () => {
    it('should have default context values in form and texteditor', () => {
      Object.keys(JSON_FILE_OBJECT_DEFAULT).map(key => {
        if (typeof JSON_FILE_OBJECT_DEFAULT[key] === 'string') {
          const input = screen.queryByRole('form-' + key)
          input ? expect(input.value).toBe(JSON_FILE_OBJECT_DEFAULT[key]) : null
          expect(screen.getByRole('text-area-editor').value).toInclude(
            JSON_FILE_OBJECT_DEFAULT[key]
          )
        }
      })
    })
  })

  describe('When modifying field form', () => {
    const json = {
      authorName: 'javi',
      projectName: 'packagejson-generator',
      version: '2.3.9',
      description: 'Testing packagejson-generator',
      mainFile: 'app.js'
    }

    it('should show changes in text editor (author)', () => {
      fireEvent.change(screen.getByRole('form-author'), {
        target: { value: json.authorName }
      })
      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        json.authorName
      )
    })

    it('should show changes in text editor (project name)', () => {
      fireEvent.change(screen.getByRole('form-name'), {
        target: { value: json.projectName }
      })
      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        json.projectName
      )
    })

    it('should show changes in text editor (version)', () => {
      fireEvent.change(screen.getByRole('form-version'), {
        target: { value: json.version }
      })
      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        json.version
      )
    })

    it('should show changes in text editor (description)', () => {
      fireEvent.change(screen.getByRole('form-description'), {
        target: { value: json.description }
      })
      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        json.description
      )
    })

    it('should show changes in text editor (main)', () => {
      fireEvent.change(screen.getByRole('form-main'), {
        target: { value: json.mainFile }
      })
      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        json.mainFile
      )
    })
  })

  describe('When selecting package in dependencies combo ', () => {
    const packageName = 'react'

    beforeEach(async () => {
      fireEvent.change(screen.getByRole('input-dependencies'), {
        target: { value: packageName }
      })

      await waitFor(() => {
        expect(screen.queryByRole('dependencies-list-item')).toBeDefined()
        fireEvent.click(screen.getByRole('dependencies-list-item'), {
          target: { innerText: packageName }
        })
      })
    })

    it('should add package to dependencies list and text editor content', () => {
      expect(screen.getByRole('dependencies-list').textContent).toInclude(
        packageName
      )
      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        packageName
      )
    })
  })

  describe('When adding script in form', () => {
    const scriptKey = 'test-jest'
    const scriptvalue = 'jest'

    it('should add script to scripts list and text editor content', () => {
      screen.getByRole('script-key').value = scriptKey
      screen.getByRole('script-value').value = scriptvalue

      fireEvent.click(screen.getByRole('script-add-btn'))
      expect(screen.getByRole('scripts-list').textContent).toInclude(scriptKey)
      expect(screen.getByRole('scripts-list').textContent).toInclude(
        scriptvalue
      )

      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        scriptKey
      )
      expect(screen.getByRole('text-area-editor').textContent).toInclude(
        scriptvalue
      )
    })
  })
})
