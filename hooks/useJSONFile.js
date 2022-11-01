import { addPackageJsonDB } from 'firebase/client';

export default function useJSONFile({ state }){

    const exportJSONFile = function(){
        const filename = 'package.json'
        const blob = new Blob([JSON.stringify(state, 0 , 4)], {
            type: "application/json"
        });

        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
            return;
        }
        
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;        
        document.body.appendChild(elem);
        elem.click();        
        document.body.removeChild(elem);
        
    }

    const generateURIJSONFile = function(){
        addPackageJsonDB(state)
        .then((element) => { window.open(process.env.NEXT_PUBLIC_BASE_URL + '/files/' + element.id, '_blank').focus() })
        .catch((error) => { console.log(error) })
    }

    return { exportJSONFile, generateURIJSONFile }
}
