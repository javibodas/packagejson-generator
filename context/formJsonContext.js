import React, { useState } from 'react';

export const JSON_FILE_OBJECT_DEFAULT = {
        "name" : "",
        "version": "1.0.0",
        "description": "",
        "author": "",
        "main":"index.js",
        "dependencies":{},
        "devDependencies": {},
        "scripts": {
            "test": "echo \"Error: no test specified\" && exit 1"
          },
        "license": "ISC"}

const FormJSONContext = React.createContext(JSON_FILE_OBJECT_DEFAULT);

export function FormJSONContextProvider({children}){

    const [ formJsonCtx, setFormJsonCtx ] = useState(JSON_FILE_OBJECT_DEFAULT)
    
    return(<FormJSONContext.Provider value={{formJsonCtx, setFormJsonCtx}}>{children}</FormJSONContext.Provider>)
}

export default FormJSONContext;