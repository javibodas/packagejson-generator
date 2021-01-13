import React, { useState } from 'react';

export const JSON_FILE_OBJECT_DEFAULT = {
        "name" : "",
        "version": "1.0.0",
        "description": "",
        "author": "",
        "main":"index.js",
        "dependencies":{},
        "devDependencies": {}}

const TextEditorJSONContext = React.createContext(JSON_FILE_OBJECT_DEFAULT);

export function TextEditorJSONContextProvider({children}){

    const [ textEditorJSONCtxt, setTextEditorJSONCtxt ] = useState(JSON_FILE_OBJECT_DEFAULT)
    
    return(<TextEditorJSONContext.Provider value={{textEditorJSONCtxt, setTextEditorJSONCtxt}}>{children}</TextEditorJSONContext.Provider>)
}

export default TextEditorJSONContext;