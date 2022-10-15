import ProjectData from 'components/ProjectData';
import Dependencies from 'components/Dependencies';
import Scripts from 'components/Scripts';

export default function Form(){
    return(<>
            <div className='forms'>
                    <ProjectData />
                    <Dependencies title='Dependencies' type='dep' classType='dependencies'/>
                    <Dependencies title='Dev dependencies' type='dev' classType='devDependencies'/>
                    <Scripts />
            </div>
        </>)
}