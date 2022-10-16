import { useContext } from "react";
import dynamic from "next/dynamic";
import JSONCtx from 'context';

const MonacoEditor = dynamic(import("react-monaco-editor"), { ssr: false });

export default function TextEditor() {
    const { state, dispatch } = useContext(JSONCtx)

    const updateContext = function (newValue, event) {
      try {
          const jsonParsed = JSON.parse(newValue)

          dispatch({type: 'updateJSON', value: jsonParsed})

      } catch (error) {}
    }

    return (
      <>
        <div className="text-editor" data-testid="text-area-editor">
            <MonacoEditor
                editorDidMount={() => {
                    window.MonacoEnvironment.getWorkerUrl = (_moduleId, label) => {
                        if (label === "json") return "_next/static/json.worker.js";
                        return "_next/static/editor.worker.js";
                    };
                }}
                language="json"
                theme="vs-dark"
                value={ JSON.stringify(state, 0, 4) }
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
