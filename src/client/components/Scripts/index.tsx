import { useContext } from 'react'
import Badge from 'src/client/components/Badge'
import Button from 'src/client/components/Button'
import FileCtx from 'src/client/context/file'
import useScripts from 'src/client/hooks/useScripts'


export default function Scripts(): JSX.Element {

	const { file, dispatch } = useContext(FileCtx)
	const { addScript, removeScript } = useScripts({ dispatch, file })

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
					{file.json.scripts ? 
						Object.keys(file.json.scripts).map(script => <Badge key={script} type='script' label={script} value={file.json.scripts[script]} remove={removeScript}/>)
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