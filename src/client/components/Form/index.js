import ProjectData from 'src/client/components/ProjectData'
import Dependencies from 'src/client/components/Dependencies'
import Scripts from 'src/client/components/Scripts'

export default function Form(){
	return(<>
		<div className='forms'>
			<ProjectData />
			<Dependencies title='Dependencies' type='dep' classType='dependencies'/>
			<Dependencies title='Dev Dependen.' type='dev' classType='devDependencies'/>
			<Scripts />
		</div>
	</>)
}