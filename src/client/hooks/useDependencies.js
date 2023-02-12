import { useState } from 'react'
import getDependencies from 'src/client/services/getDependencies'

export default function useDependencies({classType, type, dispatch, file}){

	const [ packages, setPackages ] = useState([])
	const EMPTY_OR_ERROR_PACKAGE = {'name' : 'No packages founded'}

	const outFocusInputDependencie = () => {
		const packagesListElement = document.getElementById('packlist' + type)
		if (packagesListElement) packagesListElement.classList.remove('active')
	}

	const showPackagesList = () => {
		const packagesListEl = document.getElementById('packlist' + type)
		if (!packagesListEl.classList.contains('active')) packagesListEl.classList.add('active')
	}

	const searchPackages = async (str) => {
		try {
			const response = await getDependencies(str)
			
			if (response.error) throw new Error()
            
			setPackages(response.data)
			showPackagesList()
		} catch (e) {
			console.log(e.message)
			setPackages([EMPTY_OR_ERROR_PACKAGE])
		}
	}

	let timer
	const typePackage = (e, timeout = 300) => {
		clearTimeout(timer)

		if(e.target.value === '') { 
			outFocusInputDependencie()
			return
		}

		const str = e.target.value
		timer = setTimeout(() => { searchPackages(str) }, timeout)
	}

	const addPackage = (event) => {
		const packagesListElement = document.getElementById('packlist' + type)
		const inputPackage = document.getElementById('inpt-dependencies' + type)

		if (event.target.innerText.trim() === '') {
			clearDependenciesElements(packagesListElement, inputPackage)
			return
		}

		const packageName = event.target.innerText.replace(/(\r\n|\n|\r)/gm,'').split('(')[0]
		const packageSelected = packages.find(pack => pack.name == packageName)
            
		if (!file.json[classType]) file.json[classType] = {}
		const alreadyAdded = Object.keys(file.json[classType]).find(dependencieName => dependencieName == packageName)

		if (alreadyAdded || !packageSelected) {
			clearDependenciesElements(packagesListElement, inputPackage)
			return
		}

		if (classType === 'dependencies') dispatch({type: 'addDependencie', key: packageSelected.name, value: packageSelected.version})
		if (classType === 'devDependencies') dispatch({type: 'addDevDependencie', key: packageSelected.name ,value: packageSelected.version})
	}

	const clearDependenciesElements = (packagesListElement, inputPackage) => {
		if (packagesListElement) packagesListElement.classList.remove('active')
		if (inputPackage) inputPackage.value = ''
	}
    
	const removePackage = function(packageName) {
		if (classType === 'dependencies') dispatch({type: 'removeDependencie', key: packageName})
		if (classType === 'devDependencies') dispatch({type: 'removeDevDependencie', key: packageName})
	}

	return { packages, typePackage, addPackage, removePackage, outFocusInputDependencie }
}