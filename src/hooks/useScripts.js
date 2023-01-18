export default function useScripts({dispatch, file }){

    const addScript = function(event){
        const keyScript = document.getElementById('key-script').value
        const commandScript = document.getElementById('command-script').value

        if(keyScript.trim() === '' || commandScript.trim() === '' ) return
        if(!file.json.scripts) file.json.scripts = {}

        const alreadyAdded = Object.keys(file.json.scripts).find(scriptKey => scriptKey === keyScript)
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