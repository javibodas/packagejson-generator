import { ChangeEvent, useContext } from 'react'
import FileCtx from 'src/context/file'


export default function ProjectData(): JSX.Element {

	const { file, dispatch } = useContext(FileCtx)

	const typeData = (event: ChangeEvent<HTMLInputElement>): void => {
		if (!event.target) return

		const target: HTMLInputElement = event.target as HTMLInputElement
		if (target.name === 'projectName') dispatch({type: 'updateProjectName', value: target.value})
		if (target.name === 'version') dispatch({type: 'updateProjectVersion', value: target.value})
		if (target.name === 'description') dispatch({type: 'updateProjectDescription', value: target.value})
		if (target.name === 'author') dispatch({type: 'updateProjectAuthor', value: target.value})
		if (target.name === 'main') dispatch({type: 'updateProjectMainFile', value: target.value})
	}

	return(<div>
		<div className='grid grid-cols-5 py-1.5 px-0'>
			<label className='label-title mx-4 my-auto col-start-1 col-end-1 font-bold lg:text-base text-[10px]'>Project name</label>
			<input className = 'w-full py-1 px-0 col-start-2 col-end-6 border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder='Project123' name='projectName' onChange={typeData} value={file.json.name} data-testid='form-name'/>
		</div>
		<div className='grid grid-cols-5 py-1.5 px-0'>
			<label className='label-title mx-4 my-auto col-start-1 col-end-1 font-bold lg:text-base text-[10px]'>Version</label>
			<input className = 'w-full py-1 px-0 col-start-2 col-end-6 border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder='1.0.0' name='version' onChange={typeData} value={file.json.version} data-testid='form-version'/>
		</div>
		<div className='grid grid-cols-5 py-1.5 px-0'>
			<label className='label-title mx-4 my-auto col-start-1 col-end-1 font-bold lg:text-base text-[10px]'>Description</label>
			<input className = 'w-full py-1 px-0 col-start-2 col-end-6 border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder='Build the next generation of js...' name='description' onChange={typeData} value={file.json.description} data-testid='form-description'/>
		</div>
		<div className='grid grid-cols-5 py-1.5 px-0'>
			<label className='label-title mx-4 my-auto col-start-1 col-end-1 font-bold lg:text-base text-[10px]'>Author</label>
			<input className = 'w-full py-1 px-0 col-start-2 col-end-6 border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder='Author' name='author' onChange={typeData} value={file.json.author} data-testid='form-author'/>
		</div>
		<div className='grid grid-cols-5 py-1.5 px-0'>
			<label className='label-title mx-4 my-auto col-start-1 col-end-1 font-bold lg:text-base text-[10px]'>Main file</label>
			<input className = 'w-full py-1 px-0 col-start-2 col-end-6 border-b-1 border-solid border-gray-200 hover:border-garnet hover:outline-none focus:border-garnet focus:outline-none rounded-none lg:text-base text-[10px]' placeholder='index.js' name='main' onChange={typeData} value={file.json.main} data-testid='form-main'/>
		</div>
	</div>)
}