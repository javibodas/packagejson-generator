import { useContext } from 'react'
import FileCtx from 'src/context/file'
import Badge from 'src/components/Badge'
import Button from 'src/components/Button'
import useScripts from 'src/hooks/useScripts'


export default function Scripts(){

	const { file, dispatch } = useContext(FileCtx)
	const { addScript, removeScript } = useScripts({ dispatch, file })

	return(<>
		<div className='form-group form-scripts'>
			<div className='dependencies-box'>
				<div className='data-box'>
					<label className='label-title'>Scripts</label>
					<input id='key-script' className = 'input-form key-inpt' placeholder='Key' data-testid='script-key'/>
					<input id='command-script' className = 'input-form comd-inpt' placeholder='Command' data-testid='script-value'/>
					<Button className='btn-add-script' name='btn-add-script' testid='script-add-btn' click={addScript}>+</Button>
				</div>
				<div id='scripts-list' className='scripts-list' data-testid='scripts-list'>
					{file.json.scripts ? 
						Object.keys(file.json.scripts).map(key => <Badge type='script' key={key} objKey={key} objValue={file.json.scripts[key]} remove={removeScript}/>)
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

                .btn-add-script {
                    grid-column: 5/5;
                    grid-row: 1;
                }
            `}</style>
	</>)
}