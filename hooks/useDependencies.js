import { useState } from 'react'
import getDependencies from 'services/getDependencies';

export default function useDependencies({classType, type, dispatch, state}){

    const [ packages, setPackages ] = useState([])
    const EMPTY_OR_ERROR_PACKAGE = {'name' : 'No packages founded'}

    const typePackage = function(e){
        if(e.target.value == ''){ 
            const packagesListEl = document.getElementById('packlist' + type);
            packagesListEl.classList.remove('active')
            return
        }

        getDependencies(e.target.value)
        .then(response => {
            if(response.error){
                setPackages([EMPTY_OR_ERROR_PACKAGE])
            }else{
                setPackages(response.data)
                const packagesListEl = document.getElementById('packlist' + type);
                if(!packagesListEl.classList.contains('active')) packagesListEl.classList.add('active')
            }
        })
        .catch((error) => { setPackages([EMPTY_OR_ERROR_PACKAGE]); console.log(error); })
    }

    const addPackage = function(event){

        if(!event.target.innerText.trim() == ''){

            const packageName = event.target.innerText.replace(/(\r\n|\n|\r)/gm,"").split("(")[0]
            const packageSelected = packages.find(pack => pack.name == packageName)
            
            if(!state[classType]) state[classType] = {}

            const alreadyAdded = Object.keys(state[classType]).find(dependencieName => dependencieName == packageName)

            if(!alreadyAdded && packageSelected){
                if(classType == 'dependencies'){
                    dispatch({type: 'addDependencie', key: packageSelected.name, value: packageSelected.version})
                }else if(classType == 'devDependencies'){
                    dispatch({type: 'addDevDependencie', key: packageSelected.name ,value: packageSelected.version})
                }
            }
        }

        const packagesListElement = document.getElementById('packlist' + type)
        if(packagesListElement) packagesListElement.classList.remove('active')
        const inputPackage = document.getElementById('inpt-dependencies' + type)
        if(inputPackage) inputPackage.value = ''

    }
    
    const removePackage = function(packageName){
        if(classType == 'dependencies'){
            dispatch({type: 'removeDependencie', key: packageName})
        }else if(classType == 'devDependencies'){
            dispatch({type: 'removeDevDependencie', key: packageName})
        }
    }

    const outFocusInputDependencie = function(){
        const packagesListElement = document.getElementById('packlist' + type)
        if(packagesListElement) packagesListElement.classList.remove('active')
    }


    return { packages, typePackage, addPackage, removePackage, outFocusInputDependencie }

}