import { useContext } from 'react'
import FileCtx from 'src/client/context/file'
import UserCtx from 'src/client/context/user'

export default function FileMetaData() {

	const { file, dispatch } = useContext(FileCtx)
	const { user } = useContext(UserCtx)

	const handleChangeCheckIsPrivate = (event) => {
		console.log(event.target.checked)
		dispatch({type: 'updateIsPrivate', value: event.target.checked })
	}

	const isPrivateCheckMustNotBeShown = () => {
		const userNotLogged = !user.isLogged
		const publicFileAndUserNotOwner = (file.id && !file.isPrivate && file.createdBy && user.uid !== file.createdBy)

		return userNotLogged || publicFileAndUserNotOwner
	}

	return(<div>
		{ isPrivateCheckMustNotBeShown() ? null
			: (<div><input type="checkbox" defaultChecked={file.isPrivate} onChange={handleChangeCheckIsPrivate}/><span>Private</span></div>) 
		}
	</div>)
}