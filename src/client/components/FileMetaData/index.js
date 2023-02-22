import { useContext } from 'react'
import FileCtx from 'src/client/context/file'
import UserCtx from 'src/client/context/user'

export default function FileMetaData() {

	const { file, dispatch } = useContext(FileCtx)
	const { user } = useContext(UserCtx)

	const handleChangeCheckbox = () => {
		dispatch()
	}

	if (!file.id && !user.isLogged) {
		return (<div></div>)
	}

	if (!file.id) {
		return (<div>
			<input type="checkbox" defaultChecked={file.isPrivate} onChange={handleChangeCheckbox}/>
			<span>Private</span>
		</div>)
	}

	if (file.createdBy && user.uid === file.createdBy) {
		return (<div>
			<input type="checkbox" defaultChecked={file.isPrivate} onChange={handleChangeCheckbox}/>
			<span>Private</span>
		</div>)
	}

	return (<span>Not is mine</span>)
}