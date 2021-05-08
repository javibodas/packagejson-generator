import { useState } from 'react';
import { addPackageJsonDB } from 'firebase/client';

export default function useJSONFile({ state }){

    const [ errorField, setErrorField ] = useState('')
    const [ uriJSON, setUriJSON ] = useState('')

    const checkFields = function(){
        if (!state['name'] || state['name'].trim() == '')
            return 'Project Name'
        else if (!state['author'] || state['author'].trim() == '')
            return 'Author'
        else if(!state['version'] || state['version'].trim() == '')
            return 'Version'
        
        return null
    }

    const exportJSONFile = function(){
        const errorFields = checkFields()
        if(errorFields){
            setErrorField(errorFields)
            document.getElementById('err-popbox').style.display = 'flex'
            return
        }

        // Create File
        const filename = 'package.json'
        const blob = new Blob([JSON.stringify(state, 0 , 4)], {
            type: "text/plain;charset=utf-8"
        });

        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }

    const generateURIJSONFile = function(){
        const errorFields = checkFields()
        if(errorFields){
            setErrorField(errorFields)
            document.getElementById('err-popbox').style.display = 'flex'
            return
        }

        addPackageJsonDB(state)
        .then((element) => { 
            setUriJSON(process.env.NEXT_PUBLIC_URI_PACKAGES + element.id) 
            document.getElementById('cp-uri-popbox').style.display = 'flex'
        })
        .catch((error) => { console.log(error) })
    }


    return { exportJSONFile, generateURIJSONFile, errorField, uriJSON }
}