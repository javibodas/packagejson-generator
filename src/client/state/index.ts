import { File } from 'src/types/File'

export const fileInitialState: File = {
	json: {
		name:	'example',
		version: '1.0.0',
		description: 'Build the next generation of js...',
		author: '',
		main: 'index.js',
		dependencies: {},
		devDependencies: {},
		scripts: {
			test: 'echo "Error: no test specified" && exit 1',
		},
		license: 'ISC',
	},
}
