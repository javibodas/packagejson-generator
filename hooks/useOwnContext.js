export default function useOwnContext({classType, textEditorJSONCtxt, setTextEditorJSONCtxt, formJsonCtx, setFormJsonCtx}){


    const updateDependenciesContext = function(newDependencies){
        if(classType == 'dependencies'){
            setTextEditorJSONCtxt({...textEditorJSONCtxt, dependencies: newDependencies})
            setFormJsonCtx({...formJsonCtx, dependencies: newDependencies})
        }else if(classType == 'devDependencies'){
            setTextEditorJSONCtxt({...textEditorJSONCtxt, devDependencies: newDependencies})
            setFormJsonCtx({...formJsonCtx, devDependencies: newDependencies})
        }
    }

    const addDependencieContext = function(elementToAdd){
        const newDependencies = formJsonCtx[classType]
        newDependencies[elementToAdd.name] = elementToAdd.version

        updateDependenciesContext(newDependencies)
    }

    const removeDependencieContext = function(elementToRemove){
        const newDependencies = formJsonCtx[classType];
        delete newDependencies[elementToRemove]

        updateDependenciesContext(newDependencies)
    }

    const updateScriptContext = function(newScripts){
        setTextEditorJSONCtxt({...textEditorJSONCtxt, scripts: newScripts})
        setFormJsonCtx({...formJsonCtx, scripts: newScripts})
    }

    const addScriptContext = function(key, command){
        const newScripts = formJsonCtx.scripts
        newScripts[key] = command

        updateScriptContext(newScripts)
    }

    const removeScriptContext = function(elementToRemove){
        const newScripts = formJsonCtx.scripts;
        delete newScripts[elementToRemove]

        updateScriptContext(newScripts)
    }


    return { addDependencieContext, removeDependencieContext, addScriptContext, removeScriptContext }

}

