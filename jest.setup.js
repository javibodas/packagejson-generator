import '@testing-library/jest-dom'
import 'whatwg-fetch'

// Mock @monaco-editor/react to avoid dynamic import issues
jest.mock('@monaco-editor/react', () => {
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

// Mock next-auth/react for tests
jest.mock('next-auth/react', () => {
	const React = require('react')
	return {
		useSession: jest.fn(() => ({ data: null, status: 'unauthenticated' })),
		signIn: jest.fn(),
		signOut: jest.fn(),
		SessionProvider: ({ children }) => React.createElement(React.Fragment, null, children),
		getSession: jest.fn(),
		getCsrfToken: jest.fn(),
		getProviders: jest.fn(),
	}
})
