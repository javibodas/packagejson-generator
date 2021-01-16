import { useContext, useEffect, useState } from 'react';
import dynamic from "next/dynamic";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import TextEditorJSONContext from 'context/textEditorJsonContext';
import FormJSONContext from 'context/formJsonContext';
import useEditor from 'hooks/useEditor';
import { PACKAGE_JSON_SCHEMA } from './schema.js';

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

var editor = null

export default function TextEditor(){

    const [ errorMessage, setErrorMessage ] = useState('')
    const { textEditorJSONCtxt, setTextEditorJSONCtxt } = useContext(TextEditorJSONContext)
    const { setFormJsonCtx } = useContext(FormJSONContext)
    const { validateSchemaAJV, createLinesEditor } = useEditor()

    useEffect(function(){
        const error = validateSchemaAJV(textEditorJSONCtxt, PACKAGE_JSON_SCHEMA)
        if (error) setErrorMessage(error)
    }, [textEditorJSONCtxt])

    useEffect(function(){
        editor = document.getElementById("json-editor")
    })

    const updateContext = function(newValue, event){

        try{
            const jsonParsed = JSON.parse(newValue)
            const error = validateSchemaAJV(textEditorJSONCtxt, PACKAGE_JSON_SCHEMA)
            if (error) setErrorMessage(error)

            setFormJsonCtx(jsonParsed)
            setTextEditorJSONCtxt(jsonParsed)
        }catch(error){
            setErrorMessage('WRONG JSON STRUCTURE')
        }
    }

    return(<>
            <div className='text-editor'>
                <MonacoEditor
                    editorDidMount={() => {
                        // @ts-ignore
                        window.MonacoEnvironment.getWorkerUrl = (
                        _moduleId,
                        label
                        ) => {
                        if (label === "json")
                            return "_next/static/json.worker.js";
                        return "_next/static/editor.worker.js";
                        };
                    }}
                    language="json"
                    theme="vs-dark"
                    value={JSON.stringify(textEditorJSONCtxt, 0 ,4)}
                    options={{
                        minimap: {
                        enabled: false
                        }
                    }}
                    onChange={updateContext}
                />
            </div>
            <style jsx>{`
                .text-editor{
                    width: 100%;
                    height: 100%;
                }
            `}</style>
            </>);

}