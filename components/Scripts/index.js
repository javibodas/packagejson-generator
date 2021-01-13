import { useContext } from 'react';
import Badge from 'components/Badge';
import Button from 'components/Button';
import TextEditorJSONContext from 'context/textEditorJsonContext';
import FormJSONContext from 'context/formJsonContext';
import useOwnContext from 'hooks/useOwnContext';


export default function Scripts(){

    const { textEditorJSONCtxt, setTextEditorJSONCtxt } = useContext(TextEditorJSONContext)
    const { formJsonCtx, setFormJsonCtx } = useContext(FormJSONContext)
    const { addScriptContext, removeScriptContext } = useOwnContext({textEditorJSONCtxt, setTextEditorJSONCtxt, formJsonCtx, setFormJsonCtx})

    const addScript = function(event){
        const key = document.getElementById('key-script').value
        const command = document.getElementById('command-script').value

        if(key.trim() === '' || command.trim() === '' ) return
        if(!formJsonCtx.scripts) formJsonCtx.scripts = {}

        const alreadyAdded = Object.keys(formJsonCtx.scripts).find(scriptKey => scriptKey === key)
        if(!alreadyAdded) addScriptContext(key, command)

        const keyElement = document.getElementById('key-script')
        const commdElement = document.getElementById('command-script')
        if(keyElement) keyElement.value = ''
        if(commdElement) commdElement.value = ''

    }

    const removeScript = function(scriptKey){
        removeScriptContext(scriptKey)
    }

    return(<>
            <div className='form-group form-scripts'>
                <div className='dependencies-box'>
                    <div className='data-box'>
                        <label className='label-title'>Scripts</label>
                        <input id='key-script' className = 'input-form key-inpt' placeholder='Key' />
                        <input id='command-script' className = 'input-form comd-inpt' placeholder='Command'/>
                        <Button name= 'btn-add-script' click={addScript}>+</Button>
                    </div>
                    <div id='scripts-list' className='scripts-list'>
                        {formJsonCtx.scripts ? 
                            Object.keys(formJsonCtx.scripts).map(key => <Badge type='script' key={key} objKey={key} objValue={formJsonCtx.scripts[key]} remove={removeScript}/>)
                        : null
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`

                .form-scripts .scripts-list{
                    padding: 1rem 2rem 1rem 8rem;
                    display: flex;
                    flex-flow: row wrap;
                }

                .form-scripts .key-inpt{
                    max-width: 20%;
                    min-width: 20%;
                }

                .form-scripts .comd-inpt{
                    max-width: 50%;
                    min-width: 50%;
                }
            `}</style>
        </>)
}