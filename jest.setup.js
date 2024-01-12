import '@testing-library/jest-dom'
import 'whatwg-fetch'

jest.mock('src/lib/firebase/firebase', () => {
	return jest.fn().mockImplementation(() => {
		return { firebaseApp: {}, auth: {} }
	})
})