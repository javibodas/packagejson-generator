import { addFile } from 'src/firebase/client';

export default function useFile({ state }){

    const exportFile = function(){
        const filename = 'package.json'
        const blob = new Blob([JSON.stringify(state, 0 , 4)], {
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

    const saveFile = function(){
        addFile(state)
        .then((element) => { window.open(process.env.NEXT_PUBLIC_BASE_URL + '/files/' + element.id, '_blank').focus() })
        .catch((error) => { console.log(error) })
    }

    return { exportFile, saveFile }
}
