const fileInitialState = {
	json: {
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
	},
}

export default function fileReducer(file, action) {
    
	switch (action.type) {
	case 'updateProjectName':
		return {...file, json: {...file.json, 'name': action.value}}
	case 'updateProjectVersion':
		return {...file, json: {...file.json, 'version': action.value}}
	case 'updateProjectDescription':
		return {...file, json: {...file.json, 'description': action.value}}
	case 'updateProjectAuthor':
		return {...file, json: {...file.json, 'author': action.value}}
	case 'updateProjectMainFile':
		return {...file, json: {...file.json, 'main': action.value}}
	case 'updateIsPrivate':
		return {...file, isPrivate: action.value}
	case 'addDependencie':
		let addDependencies = file.json.dependencies
		addDependencies[action.key] = action.value
		return {...file, json: {...file.json, 'dependencies': addDependencies}}
	case 'removeDependencie':
		let delDependencies = file.json.dependencies
		delete delDependencies[action.key]
		return {...file, json: {...file.json, 'dependencies': delDependencies}}
	case 'addDevDependencie':
		var newDevDependencies = file.json.devDependencies
		newDevDependencies[action.key] = action.value
		return {...file, json: {...file.json, 'devDependencies': newDevDependencies}}
	case 'removeDevDependencie':
		var newDevpendencies = file.json.devDependencies
		delete newDevpendencies[action.key]
		return {...file, json: {...file.json, 'devDependencies': newDevpendencies}}
	case 'addScript':
		let addScripts = file.json.scripts
		addScripts[action.key] = action.value
		return {...file, json: {...file.json, 'scripts': addScripts}}
	case 'removeScript':
		let delScripts = file.json.scripts
		delete delScripts[action.key]
		return {...file, json: {...file.json, 'scripts': delScripts}}
	case 'updateJSON':
		return action.value
	case 'clearJSON':
		return action.value ? {...fileInitialState, id: action.value} : fileInitialState
	default:
		return file
	}

}
