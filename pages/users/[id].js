import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import UserCtx from 'src/client/context/user'
import useUser from 'src/client/hooks/useUser'
import FileDetailCard from 'src/client/components/FileDetailCard'
import getUser from 'src/client/services/getUser'

export default function User({ filesApi }){

	const router = useRouter()

	const [ files, setFiles ] = useState(filesApi)
	const { user, setUser } = useContext(UserCtx)
	const { deleteFile } = useUser({ user, setUser })

	const handleClickNewFile = () => {
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

	return(<>
		<div className='user-files'>
			<FileDetailCard key={0} handleClick={handleClickNewFile}/>
			{ files.map(file => <FileDetailCard key={file.id} fileDetail={file} handleClick={handleClickFile} handleDelete={handleDeleteFile} />)}
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

export async function getServerSideProps(context) {
	const id = context.params.id

	const data = await getUser(id)

	if (data.error) {
		console.log('Error al buscar el cliente' + data.error)
		return {
			redirect: {
				destination: '/',
				permanent: false
			}
		}
	}

	return { props: { filesApi: data.files ? data.files : [] }}
}