import Dependencies from 'src/components/Dependencies'
import ProjectData from 'src/components/ProjectData'
import Scripts from 'src/components/Scripts'

export default function Form(): JSX.Element {
	return(<>
		<div className='forms'>
			<ProjectData />
			<Dependencies title='Dependencies' type='dep' classType='dependencies'/>
			<Dependencies title='Dev Dependen.' type='dev' classType='devDependencies'/>
			<Scripts />
		</div>
	</>)
}