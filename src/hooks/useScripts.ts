import { StringUtils } from 'src/lib/util/StringUtils'
import { UseScriptsProps } from 'src/lib/types/client/hooks/UseScriptsProps'

export default function useScripts({ dispatch, file }: UseScriptsProps) {

	const addScript = (): void => {
		const keyElement = <HTMLInputElement> document.getElementById('key-script')
		const commandElement = <HTMLInputElement> document.getElementById('command-script')
		const keyScript: string = keyElement.value
		const commandScript: string = commandElement.value

		if (StringUtils.isEmptyString(keyScript) || StringUtils.isEmptyString(commandScript)) return

		const alreadyAdded: string = Object.keys(file.json.scripts ?? {}).find(scriptKey => scriptKey === keyScript)
		if (!alreadyAdded) dispatch({type: 'addScript', key: keyScript, value: commandScript})

		
		if (keyElement) keyElement.value = ''
		if (commandElement) commandElement.value = ''
	}

	const removeScript = (scriptKey: string): void => {
		dispatch({type: 'removeScript', key: scriptKey})
	}

	return { addScript, removeScript }
}