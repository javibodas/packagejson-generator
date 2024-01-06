import { useContext } from 'react'
import Badge from 'src/client/components/Badge'
import Button from 'src/client/components/Button'
import FileCtx from 'src/client/context/file'
import useScripts from 'src/client/hooks/useScripts'


export default function Scripts(): JSX.Element {

	const { file, dispatch } = useContext(FileCtx)
	const { addScript, removeScript } = useScripts({ dispatch, file })

	return(<div className='flex flex-col max-h-52'>
		<div className='grid grid-cols-5 py-1.5 px-0'>
			<label className='label-title mx-4 my-auto col-start-1 col-end-1 font-bold lg:text-base text-[10px]'>Scripts</label>
			<input id='key-script' className = 'w-full py-1 px-0 col-start-2 col-end-2 border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder='Key' data-testid='script-key'/>
			<input id='command-script' className = 'w-full py-1 px-0 col-start-3 col-end-5 border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder='Command' data-testid='script-value'/>
			<Button name='btn-add-script' styles='col-start-5 col-end-6' testid='script-add-btn' click={addScript}>+</Button>
		</div>
		<div id='scripts-list' className='flex flex-row flex-wrap overflow-y-auto py-4 pl-0 pr-4' data-testid='scripts-list'>
			{file.json.scripts ? 
				Object.keys(file.json.scripts).map(script => <Badge key={script} type='script' label={script} value={file.json.scripts[script]} remove={removeScript}/>)
				: null
			}
		</div>
	</div>)
}