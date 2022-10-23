import { useContext } from 'react';
import JSONCtx from 'context';
import Badge from 'components/Badge';
import Button from 'components/Button';
import useScripts from 'hooks/useScripts';


export default function Scripts(){

    const { state, dispatch } = useContext(JSONCtx)
    const { addScript, removeScript } = useScripts({'dispatch': dispatch, 'state': state })

    return(<>
            <div className='form-group form-scripts'>
                <div className='dependencies-box'>
                    <div className='data-box'>
                        <label className='label-title'>Scripts</label>
                        <input id='key-script' className = 'input-form key-inpt' placeholder='Key' data-testid='script-key'/>
                        <input id='command-script' className = 'input-form comd-inpt' placeholder='Command' data-testid='script-value'/>
                        <Button name='btn-add-script' testid='script-add-btn' click={addScript}>+</Button>
                    </div>
                    <div id='scripts-list' className='scripts-list' data-testid='scripts-list'>
                        {state.scripts ? 
                            Object.keys(state.scripts).map(key => <Badge type='script' key={key} objKey={key} objValue={state.scripts[key]} remove={removeScript}/>)
                        : null
                        }
                    </div>
                </div>
            </div>
            <style jsx>{`
                .form-scripts .scripts-list{
                    padding: 1rem 0 1rem 1rem;
                    display: flex;
                    flex-flow: row wrap;
                    overflow-y: auto;
                }

                .key-inpt {
                    grid-column: 2/2;
                    grid-row: 1;
                }
                
                .comd-inpt {
                    grid-column: 3/4;
                    grid-row: 1;
                }

                #btn-add-script {
                    grid-column: 5/5;
                    grid-row: 1;
                }
            `}</style>
        </>)
}