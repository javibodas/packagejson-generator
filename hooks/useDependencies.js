import { useState, useContext } from 'react'
import TextEditorJSONContext from 'context/textEditorJsonContext';
import FormJSONContext from 'context/formJsonContext';
import useOwnContext from 'hooks/useOwnContext';
import getDependencies from 'services/getDependencies';

export default function useDependencies({classType, type}){

    const [ packages, setPackages ] = useState([])
    const { textEditorJSONCtxt, setTextEditorJSONCtxt } = useContext(TextEditorJSONContext)
    const { formJsonCtx, setFormJsonCtx } = useContext(FormJSONContext)
    const { addDependencieContext, removeDependencieContext } = useOwnContext({classType , textEditorJSONCtxt, setTextEditorJSONCtxt, formJsonCtx, setFormJsonCtx})
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
            
            if(!formJsonCtx[classType]) formJsonCtx[classType] = {}

            const alreadyAdded = Object.keys(formJsonCtx[classType]).find(dependencieName => dependencieName == packageName)

            if(!alreadyAdded && packageSelected){
                addDependencieContext(packageSelected)
            }
        }

        const packagesListElement = document.getElementById('packlist' + type)
        if(packagesListElement) packagesListElement.classList.remove('active')
        const inputPackage = document.getElementById('inpt-dependencies' + type)
        if(inputPackage) inputPackage.value = ''

    }
    
    const removePackage = function(packageName){
        removeDependencieContext(packageName)
    }

    const outFocusInputDependencie = function(){
        const packagesListElement = document.getElementById('packlist' + type)
        if(packagesListElement) packagesListElement.classList.remove('active')
    }


    return { packages, formJsonCtx, typePackage, addPackage, removePackage, outFocusInputDependencie }

}