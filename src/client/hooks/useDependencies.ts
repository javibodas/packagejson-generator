import { ChangeEvent, MouseEvent, TouchEvent, useState } from 'react'
import getDependencies from 'src/client/services/getDependencies'
import { Dependencie } from 'src/types/Dependencie'
import { UseDependenciesProps } from 'src/types/hooks/UseDependenciesProps'
import { StringUtils } from 'src/util/StringUtils'

export default function useDependencies({ classType, type, dispatch, file }: UseDependenciesProps) {

	const [ packages, setPackages ] = useState<Array<Dependencie>>([])

	const EMPTY_OR_ERROR_PACKAGE: Dependencie = { 'name' : 'No packages founded' }
	let searchDependenciesTimer: NodeJS.Timeout

	const outFocusInputDependencie = (): void => {
		const packagesListElement: HTMLElement = document.getElementById('packlist' + type)
		if (packagesListElement) packagesListElement.classList.remove('active')
	}

	const showPackagesList = (): void => {
		const packagesListElement: HTMLElement = document.getElementById('packlist' + type)
		if (!packagesListElement.classList.contains('active')) packagesListElement.classList.add('active')
	}

	const searchPackages = async (name: string): Promise<void> => {
		try {
			const response: Array<Dependencie> = await getDependencies(name)
            
			setPackages(response)
			showPackagesList()
		} catch (error) {
			console.log(error.message)
			setPackages([EMPTY_OR_ERROR_PACKAGE])
		}
	}

	const typePackage = (e: ChangeEvent, timeout: number = 300): void => {
		clearTimeout(searchDependenciesTimer)
		const eventTarget: HTMLInputElement = <HTMLInputElement> e.target

		if (StringUtils.isEmptyString(eventTarget.value)) { 
			outFocusInputDependencie()
			return
		}

		searchDependenciesTimer = setTimeout(() => { searchPackages(eventTarget.value) }, timeout)
	}

	const addPackage = (e: MouseEvent<HTMLLIElement> | TouchEvent<HTMLLIElement>): void => {
		const eventTarget: HTMLLIElement = <HTMLLIElement> e.target
		const packagesListElement: HTMLElement = document.getElementById('packlist' + type)
		const inputPackage: HTMLInputElement = <HTMLInputElement> document.getElementById('inpt-dependencies' + type)

		if (StringUtils.isEmptyString(eventTarget.innerText)) {
			clearDependenciesElements(packagesListElement, inputPackage)
			return
		}

		const packageName: string = eventTarget.innerText.replace(/(\r\n|\n|\r)/gm,'').split('(')[0]
		const packageSelected: Dependencie = packages.find(pack => pack.name == packageName)
            
		const alreadyAdded: string = Object.keys(file.json[classType] ?? {}).find(dependencieName => dependencieName == packageName)

		if (alreadyAdded || !packageSelected) {
			clearDependenciesElements(packagesListElement, inputPackage)
			return
		}

		if (classType === 'dependencies') dispatch({type: 'addDependencie', key: packageSelected.name, value: packageSelected.version})
		if (classType === 'devDependencies') dispatch({type: 'addDevDependencie', key: packageSelected.name ,value: packageSelected.version})
	}

	const clearDependenciesElements = (packagesListElement: HTMLElement, inputPackage: HTMLInputElement): void => {
		if (packagesListElement) packagesListElement.classList.remove('active')
		if (inputPackage) inputPackage.value = ''
	}
    
	const removePackage = (packageName: string): void => {
		if (classType === 'dependencies') dispatch({type: 'removeDependencie', key: packageName})
		if (classType === 'devDependencies') dispatch({type: 'removeDevDependencie', key: packageName})
	}

	return { packages, typePackage, addPackage, removePackage, outFocusInputDependencie }
}