import { useContext } from 'react'
import Button from 'src/components/Button'
import FileCtx from 'src/context/file'
import UserCtx from 'src/context/user'
import useFile from 'src/hooks/useFile'
import useUser from 'src/hooks/useUser'


export default function Keypad(): JSX.Element {

	const { file, dispatch } = useContext(FileCtx)
	const { exportFile, handleCreateFile, handleUpdateFile } = useFile(file)

	const { user, setUser } = useContext(UserCtx)
	const { saveUserFile } = useUser({ user, setUser })

	const fileExists: string = file.id
	const fileIsForUpdating: boolean = fileExists && user && user.id === file.createdBy
	const fileIsForSavingInUser: boolean = user && !fileExists
	const fileIsForSharing: boolean = !user && !fileExists

	const handleClickSave = (): void => {
		file.id ? handleUpdateFile(file.id)
			: user ? saveUserFile(file)
				: handleCreateFile()

	}

	const handleClear = (): void => {
		dispatch({ type: 'clearJSON', value: { id: file.id, createdBy: file.createdBy }})
	}

	return(<div className='btns-keypad grid grid-cols-3 gap-x-2 sm:gap-x-20 w-full content-end'>
		<Button name='btn-exportjson' click={exportFile} testid='btn-export'>Export</Button>
		{
			fileIsForUpdating || fileIsForSharing || fileIsForSavingInUser
				? 	<Button name='btn-generateuri' click={handleClickSave} testid='btn-save'>
					{ fileExists ? 'Update' : user ? 'Save' : 'Share' }
				</Button>
				: 	null
		}
		{
			fileIsForUpdating || fileIsForSharing || fileIsForSavingInUser
				?	<Button name='btn-clear' click={handleClear} testid='btn-clear'>Clear</Button>
				: 	null
		}
	</div>)

}