import { useContext } from 'react';
import JSONCtx from 'src/context';
import UserCtx from 'src/context/user';
import useUser from 'src/hooks/useUser';
import Button from 'src/components/Button';
import useFile from 'src/hooks/useFile';


export default function Keypad(){

    const { state, dispatch } = useContext(JSONCtx)
    const { exportFile, saveFile } = useFile({state})

    const { user, setUser } = useContext(UserCtx)
    const { isLogged, saveUserFile } = useUser({ user, setUser })

    const handleSaveFile = () => {
        isLogged ? saveUserFile(state)
        : saveFile()

    }

    const handleClear = () => {
        dispatch({ type: "clearJSON" })
    }

    return(<>
            <div className='btns-keypad'>
                <Button name='btn-exportjson' click={exportFile} testid='btn-exportjson'>Export</Button>
                <Button name='btn-generateuri' click={handleSaveFile} testid='btn-generateuri'>{ !isLogged() ? 'Share' : 'Save' }</Button>
                <Button name='btn-clear' click={handleClear} testid='btn-clear'>Clear</Button>
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