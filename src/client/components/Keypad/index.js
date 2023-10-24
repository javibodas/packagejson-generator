import { useContext } from 'react'
import FileCtx from 'src/client/context/file'
import UserCtx from 'src/client/context/user'
import useUser from 'src/client/hooks/useUser'
import Button from 'src/client/components/Button'
import useFile from 'src/client/hooks/useFile'


export default function Keypad() {

	const { user, setUser } = useContext(UserCtx)
	const { saveUserFile } = useUser({ user, setUser })

	const { file, dispatch } = useContext(FileCtx)
	const { exportFile, handleCreateFile, handleUpdateFile } = useFile({ ...file, createdBy: user.uid })

	const handleClickSave = () => {
		file.id ? handleUpdateFile(file.id)
			: user.isLogged ? saveUserFile(file.json)
				: handleCreateFile()

	}

	const handleClear = () => {
		dispatch({ type: 'clearJSON', value: file.id })
	}

	const fileIsEditable = () => {
		const fileExists = file.id
		const fileIsOwnedByCurrentUser = file.createdBy && file.createdBy === user.uid

		return !fileExists || (fileExists && fileIsOwnedByCurrentUser)
	}

	return(<>
		<div className='btns-keypad'>
			<Button name='btn-exportjson' click={exportFile} testid='btn-export'>Export</Button>
			{
				!fileIsEditable() ? null
					: <Button name='btn-generateuri' click={handleClickSave} testid='btn-save'>{ file.id ? 'Update' : !user.isLogged ? 'Share' : 'Save' }</Button>
			}
			{
				!fileIsEditable() ? null
					: <Button name='btn-clear' click={handleClear} testid='btn-clear'>Clear</Button>
			}
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