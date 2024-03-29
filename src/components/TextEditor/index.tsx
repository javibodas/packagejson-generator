import { File } from 'src/lib/types/client/File'
import { useContext } from 'react'
import FileCtx from 'src/context/file'
import dynamic from 'next/dynamic'

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false })

export default function TextEditor(): JSX.Element {
	const { file, dispatch } = useContext(FileCtx)

	const updateContext = (newValue: string): void => {
		try {
			const jsonParsed: object = JSON.parse(newValue)
			const fileUpdated: File = { ...file, json: jsonParsed } as File

			dispatch({ type: 'updateJSON', value: fileUpdated })

		} catch (error) {
			console.log('Error parsing json text editor')
		}
	}

	return (<div className="w-full h-full" data-testid="text-area-editor">
		<MonacoEditor
			language="json"
			theme="vs-dark"
			value={ JSON.stringify(file.json, null, 4) }
			options={{ minimap: { enabled: false, }, automaticLayout: true,}}
			onChange={ updateContext }
			data-testid="monaco-editor"
		/>
	</div>)
}
