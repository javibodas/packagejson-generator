import { NextRouter, useRouter } from 'next/router'
import { useContext } from 'react'
import FileDetailCard from 'front/components/FileDetailCard'
import Loading from 'front/components/Loading'
import UserCtx from 'front/state/user'
import useUser from 'front/hooks/useUser'
import useUserFiles from 'front/hooks/useUserFiles'

export default function User(): JSX.Element {
	const router: NextRouter = useRouter()
	const { id } = router.query
	const userId = typeof id === 'string' ? id : undefined

	const { files, setFiles, loading, error } = useUserFiles(userId)
	const { user, setUser } = useContext(UserCtx)
	const { deleteFile } = useUser({ user, setUser })

	const handleClickNewFile = (): void => {
		router.push('/')
	}

	const handleClickFile = (event, fileId: string): void => {
		router.push('/files/' + fileId)
	}

	const handleDeleteFile = async (event, fileId: string): Promise<void> => {
		event.stopPropagation()

		const isFileDeleted: boolean = await deleteFile(fileId)
		if (!isFileDeleted) return

		setFiles(files.filter((file) => file.id !== fileId))
	}

	if (loading) {
		return <Loading />
	}

	if (error) {
		return (
			<div className="error-container">
				<h1>Error loading files</h1>
				<p>{error}</p>
				<style jsx>{`
					.error-container {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						min-height: 400px;
						text-align: center;
					}
				`}</style>
			</div>
		)
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