import { useContext } from 'react';
import JSONCtx from 'context';


export default function ProjectData(){

    const { state, dispatch } = useContext(JSONCtx);

    const typeData = function(event){
        if(event.target){
            if(event.target.name === 'projectName'){
                dispatch({type: 'updateProjectName', value: event.target.value})
            }else if(event.target.name === 'version'){
                dispatch({type: 'updateProjectVersion', value: event.target.value})
            }else if(event.target.name === 'description'){
                dispatch({type: 'updateProjectDescription', value: event.target.value})
            }else if(event.target.name === 'author'){
                dispatch({type: 'updateProjectAuthor', value: event.target.value})
            }else if(event.target.name === 'main'){
                dispatch({type: 'updateProjectMainFile', value: event.target.value})
            }
        }
    }

    return(<>
            <div className='form-group'>
                <div className='data-box'>
                    <label className='label-title'>Project name</label>
                    <input className = 'input-form' placeholder='Project123' name='projectName' onChange={typeData} value={state.name} data-testid='form-name'/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Version</label>
                    <input className = 'input-form' placeholder='1.0.0' name='version' onChange={typeData} value={state.version} data-testid='form-version'/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Description</label>
                    <input className = 'input-form' placeholder='Build the next generation of js...' name='description' onChange={typeData} value={state.description} data-testid='form-description'/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Author</label>
                    <input className = 'input-form' placeholder='Author' name='author' onChange={typeData} value={state.author} data-testid='form-author'/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Main file</label>
                    <input className = 'input-form' placeholder='index.js' name='main' onChange={typeData} value={state.main} data-testid='form-main'/>
                </div>
            </div>
            <style jsx>{`
            `}</style>
            </>)
}