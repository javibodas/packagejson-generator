import { useContext } from 'react';
import TextEditorJSONContext from 'context/textEditorJsonContext';
import FormJSONContext from 'context/formJsonContext';
import useOwnContext from 'hooks/useOwnContext';

export default function useScripts(){

    const { textEditorJSONCtxt, setTextEditorJSONCtxt } = useContext(TextEditorJSONContext)
    const { formJsonCtx, setFormJsonCtx } = useContext(FormJSONContext)
    const { addScriptContext, removeScriptContext } = useOwnContext({textEditorJSONCtxt, setTextEditorJSONCtxt, formJsonCtx, setFormJsonCtx})


    const addScript = function(event){
        const key = document.getElementById('key-script').value
        const command = document.getElementById('command-script').value

        if(key.trim() === '' || command.trim() === '' ) return
        if(!formJsonCtx.scripts) formJsonCtx.scripts = {}

        const alreadyAdded = Object.keys(formJsonCtx.scripts).find(scriptKey => scriptKey === key)
        if(!alreadyAdded) addScriptContext(key, command)

        const keyElement = document.getElementById('key-script')
        const commdElement = document.getElementById('command-script')
        if(keyElement) keyElement.value = ''
        if(commdElement) commdElement.value = ''

    }

    const removeScript = function(scriptKey){
        removeScriptContext(scriptKey)
    }



    return { formJsonCtx, addScript, removeScript }
}