import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Global Mocks
jest.mock('src/lib/firebase/firebase', () => {
	return jest.fn().mockImplementation(() => {
		return { firebaseApp: {}, auth: {} }
	})
})

// Mock react-monaco-editor to avoid ESM import issues
jest.mock('react-monaco-editor', () => {
	const React = require('react')
	return {
		__esModule: true,
		default: React.forwardRef((props, ref) => {
			return React.createElement('div', {
				'data-testid': 'monaco-editor',
				'data-value': props.value || '',
				ref: ref,
				onChange: props.onChange || (() => {}),
				className: 'monaco-editor-mock'
			}, props.value || '')
		})
	}
})