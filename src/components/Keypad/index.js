import { useContext } from 'react'
import FileCtx from 'src/context/file'
import UserCtx from 'src/context/user'
import useUser from 'src/hooks/useUser'
import Button from 'src/components/Button'
import useFile from 'src/hooks/useFile'


export default function Keypad(){

	const { file, dispatch } = useContext(FileCtx)
	const { exportFile, saveFile, updateFile } = useFile({json: file.json})

	const { user, setUser } = useContext(UserCtx)
	const { isLogged, saveUserFile } = useUser({ user, setUser })

	const handleSaveFile = () => {
		file.id ? updateFile(file.id, file.json)
			: isLogged() ? saveUserFile(file.json)
				: saveFile()

	}

	const handleClear = () => {
		dispatch({ type: 'clearJSON', value: file.id })
	}

	return(<>
		<div className='btns-keypad'>
			<Button name='btn-exportjson' click={exportFile} testid='btn-exportjson'>Export</Button>
			<Button name='btn-generateuri' click={handleSaveFile} testid='btn-generateuri'>{ file.id ? 'Update' : !isLogged() ? 'Share' : 'Save' }</Button>
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