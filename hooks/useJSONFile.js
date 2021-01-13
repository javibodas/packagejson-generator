import { useState } from 'react';
import { addPackageJsonDB } from 'firebase/client';

export default function useJSONFile({ formJsonCtx, textEditorJSONCtxt }){

    const [ errorField, setErrorField ] = useState('')
    const [ uriJSON, setUriJSON ] = useState('')

    const checkFields = function(){
        if (!formJsonCtx['name'] || formJsonCtx['name'].trim() == '')
            return 'Project Name'
        else if (!formJsonCtx['author'] || formJsonCtx['author'].trim() == '')
            return 'Author'
        else if(!formJsonCtx['version'] || formJsonCtx['version'].trim() == '')
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
        const blob = new Blob([JSON.stringify(textEditorJSONCtxt, 0 , 4)], {
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

        addPackageJsonDB(textEditorJSONCtxt)
        .then((element) => { 
            setUriJSON(process.env.NEXT_PUBLIC_URI_PACKAGES + element.id) 
            document.getElementById('cp-uri-popbox').style.display = 'flex'
        })
        .catch((error) => { console.log(error) })
    }


    return { exportJSONFile, generateURIJSONFile, errorField, uriJSON }
}