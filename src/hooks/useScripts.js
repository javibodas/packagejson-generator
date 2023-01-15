export default function useScripts({dispatch, state }){

    const addScript = function(event){
        const keyScript = document.getElementById('key-script').value
        const commandScript = document.getElementById('command-script').value

        if(keyScript.trim() === '' || commandScript.trim() === '' ) return
        if(!state.scripts) state.scripts = {}

        const alreadyAdded = Object.keys(state.scripts).find(scriptKey => scriptKey === keyScript)
        if(!alreadyAdded)  dispatch({type: 'addScript', key: keyScript, value: commandScript})

        const keyElement = document.getElementById('key-script')
        const commdElement = document.getElementById('command-script')
        if(keyElement) keyElement.value = ''
        if(commdElement) commdElement.value = ''

    }

    const removeScript = function(scriptKey){
        dispatch({type: 'removeScript', key: scriptKey})
    }

    return { addScript, removeScript }
}