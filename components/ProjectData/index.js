import { useContext } from 'react';
import TextEditorJSONContext from 'context/textEditorJsonContext';
import FormJSONContext from 'context/formJsonContext';


export default function ProjectData(){

    const { textEditorJSONCtxt, setTextEditorJSONCtxt } = useContext(TextEditorJSONContext)
    const { formJsonCtx, setFormJsonCtx } = useContext(FormJSONContext)

    const typeData = function(event){
        if(event.target){
            if(event.target.name === 'projectName'){
                setTextEditorJSONCtxt({...textEditorJSONCtxt, 'name':event.target.value})
                setFormJsonCtx({...formJsonCtx, 'name':event.target.value})
            }else if(event.target.name === 'version'){
                setTextEditorJSONCtxt({...textEditorJSONCtxt, 'version':event.target.value})
                setFormJsonCtx({...formJsonCtx, 'version':event.target.value})
            }else if(event.target.name === 'description'){
                setTextEditorJSONCtxt({...textEditorJSONCtxt, 'description':event.target.value})
                setFormJsonCtx({...formJsonCtx, 'description':event.target.value})
            }else if(event.target.name === 'author'){
                setTextEditorJSONCtxt({...textEditorJSONCtxt, 'author':event.target.value})
                setFormJsonCtx({...formJsonCtx, 'author':event.target.value})
            }else if(event.target.name === 'main'){
                setTextEditorJSONCtxt({...textEditorJSONCtxt, 'main':event.target.value})
                setFormJsonCtx({...formJsonCtx, 'main':event.target.value})
            }
        }
    }

    return(<>
            <div className='form-group'>
                <div className='data-box'>
                    <label className='label-title'>Project name</label>
                    <input className = 'input-form' placeholder='Project123' name='projectName' onChange={typeData} value={formJsonCtx.name}/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Version</label>
                    <input className = 'input-form' placeholder='1.0.0' name='version' onChange={typeData} value={formJsonCtx.version}/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Description</label>
                    <input className = 'input-form' placeholder='Build the next generation of js...' name='description' onChange={typeData} value={formJsonCtx.description}/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Author</label>
                    <input className = 'input-form' placeholder='Author' name='author' onChange={typeData} value={formJsonCtx.author}/>
                </div>
                <div className='data-box'>
                    <label className='label-title'>Main file</label>
                    <input className = 'input-form' placeholder='index.js' name='main' onChange={typeData} value={formJsonCtx.main}/>
                </div>
            </div>
            <style jsx>{`
            `}</style>
            </>)
}