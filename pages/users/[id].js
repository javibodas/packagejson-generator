import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import UserCtx from 'src/context/user'
import useUser from 'src/hooks/useUser'
import getUserFiles from 'src/services/getUserFiles'
import FileDetailCard from 'src/components/FileDetailCard'

export default function User(){

	const router = useRouter()

	const [ files, setFiles ] = useState([])
	const { user, setUser } = useContext(UserCtx)
	const { deleteFile } = useUser({ user, setUser })

	const handleClickNewFile = () => {
		console.log('Must redirect')
		router.push('/')
	}

	const handleClickFile = (event, fileId) => {
		router.push('/files/' + fileId)
	}

	const handleDeleteFile = async (event, fileId) => {
		event.stopPropagation()
		await deleteFile(fileId)
		setFiles(files.filter((file) => file.id !== fileId))
	}

	useEffect(async function(){
		if (router.isReady) {
			const response = await getUserFiles(router.query.id)
			setFiles(response.data)
		}
	}, [router.isReady])

	return(<>
		<div className='user-files'>
			<FileDetailCard key={0} handleClick={handleClickNewFile}/>
			{ files.map(file => <FileDetailCard key={file.id} id={file.id} fileDetail={file} handleClick={handleClickFile} handleDelete={handleDeleteFile} />)}
		</div>
		<style>{`
            .user-files {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;

                max-width: 60%;
                margin: 0 auto;
                padding: 2rem 0;
            }
        `}</style>
	</>)
}