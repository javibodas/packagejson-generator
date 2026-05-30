import Dependencies from 'front/components/Dependencies'
import ProjectData from 'front/components/ProjectData'
import Scripts from 'front/components/Scripts'

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