import { useContext } from 'react';
import JSONCtx from 'context';
import Button from 'components/Button';
import useJSONFile from 'hooks/useJSONFile';


export default function Keypad(){

    const { state, dispatch } = useContext(JSONCtx)
    const { exportJSONFile, generateURIJSONFile } = useJSONFile({state})

    const clearJSON = function(){
        dispatch({ type: "clearJSON" })
    }

    return(<>
            <div className='btns-keypad'>
                <Button name='btn-exportjson' click={exportJSONFile} testid='btn-exportjson'>Export</Button>
                <Button name='btn-generateuri' click={generateURIJSONFile} testid='btn-generateuri'>Share</Button>
                <Button name='btn-clear' click={clearJSON} testid='btn-clear'>Clear</Button>
            </div>
        <style jsx>{`
            .btns-keypad {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                grid-column-gap: 5rem;
                width: 100%;
                align-content: end;
            }

            @media (max-width: 600px) {
                .btns-keypad {
                    grid-column-gap: .5rem;
                }
            }
        `}</style>
        </>)

}