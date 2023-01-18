import { useRouter } from 'next/router'
import { addFile as saveFileFirebase, updateFile as updateFileFirebase } from 'src/firebase/client';

export default function useFile({ json }){

    const router = useRouter()

    const exportFile = function(){
        const filename = 'package.json'
        const blob = new Blob([JSON.stringify(json, 0 , 4)], {
            type: "application/json"
        });

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
            return;
        }
        
        let elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
        
    }

    const updateFile = function(fileId, newFile) {
        updateFileFirebase(fileId, newFile)
        .then()
        .catch()
    }

    const saveFile = function(){
        saveFileFirebase(json)
        .then((element) => router.push('/files/' + element.id))
        .catch((error) => { console.log(error) })
    }

    return { exportFile, saveFile, updateFile }
}
