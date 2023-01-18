import { useContext } from "react";
import dynamic from "next/dynamic";
import FileCtx from 'src/context/file';

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function TextEditor() {
    const { file, dispatch } = useContext(FileCtx)

    const updateContext = function (newValue, event) {
      try {
          const jsonParsed = JSON.parse(newValue)

          dispatch({type: 'updateJSON', value: { ...file, json: jsonParsed}})

      } catch (error) {}
    }

    return (
      <>
        <div className="text-editor" data-testid="text-area-editor">
            <MonacoEditor
                language="json"
                theme="vs-dark"
                value={ JSON.stringify(file.json, 0, 4) }
                options={{ minimap: { enabled: false, }, automaticLayout: true,}}
                onChange={ updateContext }
                data-testid="monaco-editor"
            />
        </div>
        <style jsx>{`
            .text-editor {
                width: 100%;
                height: 100%;
            }
        `}</style>
      </>
  );
}
