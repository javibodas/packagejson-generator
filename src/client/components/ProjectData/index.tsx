import { ChangeEvent, useContext } from 'react'
import FileCtx from 'src/client/context/file'


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

	return(<>
		<div className='form-group'>
			<div className='data-box'>
				<label className='label-title'>Project name</label>
				<input className = 'input-form' placeholder='Project123' name='projectName' onChange={typeData} value={file.json.name} data-testid='form-name'/>
			</div>
			<div className='data-box'>
				<label className='label-title'>Version</label>
				<input className = 'input-form' placeholder='1.0.0' name='version' onChange={typeData} value={file.json.version} data-testid='form-version'/>
			</div>
			<div className='data-box'>
				<label className='label-title'>Description</label>
				<input className = 'input-form' placeholder='Build the next generation of js...' name='description' onChange={typeData} value={file.json.description} data-testid='form-description'/>
			</div>
			<div className='data-box'>
				<label className='label-title'>Author</label>
				<input className = 'input-form' placeholder='Author' name='author' onChange={typeData} value={file.json.author} data-testid='form-author'/>
			</div>
			<div className='data-box'>
				<label className='label-title'>Main file</label>
				<input className = 'input-form' placeholder='index.js' name='main' onChange={typeData} value={file.json.main} data-testid='form-main'/>
			</div>
		</div>
		<style jsx>{''}</style>
	</>)
}