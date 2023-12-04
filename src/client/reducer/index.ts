import { File } from 'src/types/File'
import { FileAction } from 'src/types/reducer/FileAction'

const fileInitialState: object = {
	name: 'example',
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
}

export default (file: File, action: FileAction): File => {
    
	switch (action.type) {
	case 'updateProjectName':
		return {...file, json: {...file.json, 'name': <string>action.value }}
	case 'updateProjectVersion':
		return {...file, json: {...file.json, 'version': <string>action.value }}
	case 'updateProjectDescription':
		return {...file, json: {...file.json, 'description': <string>action.value }}
	case 'updateProjectAuthor':
		return {...file, json: {...file.json, 'author': <string>action.value }}
	case 'updateProjectMainFile':
		return {...file, json: {...file.json, 'main': <string>action.value }}
	case 'addDependencie':
		const addDependencies = file.json.dependencies
		addDependencies[action.key] = action.value
		return {...file, json: {...file.json, 'dependencies': addDependencies}}
	case 'removeDependencie':
		const delDependencies = file.json.dependencies
		delete delDependencies[action.key]
		return {...file, json: {...file.json, 'dependencies': delDependencies}}
	case 'addDevDependencie':
		const newDevDependencies = file.json.devDependencies
		newDevDependencies[action.key] = action.value
		return {...file, json: {...file.json, 'devDependencies': newDevDependencies}}
	case 'removeDevDependencie':
		const newDevpendencies = file.json.devDependencies
		delete newDevpendencies[action.key]
		return {...file, json: {...file.json, 'devDependencies': newDevpendencies}}
	case 'addScript':
		const addScripts = file.json.scripts
		addScripts[action.key] = action.value
		return {...file, json: {...file.json, 'scripts': addScripts}}
	case 'removeScript':
		const delScripts = file.json.scripts
		delete delScripts[action.key]
		return {...file, json: {...file.json, 'scripts': delScripts}}
	case 'updateJSON':
		return <File>action.value
	case 'clearJSON':
		const { id, createdBy } = <File>action.value
		return { json: fileInitialState, id, createdBy } as File
	default:
		return file
	}
}
