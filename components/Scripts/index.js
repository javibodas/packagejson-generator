
import Badge from 'components/Badge';
import Button from 'components/Button';
import useScripts from 'hooks/useScripts';


export default function Scripts(){

    const { formJsonCtx, addScript, removeScript } = useScripts()

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