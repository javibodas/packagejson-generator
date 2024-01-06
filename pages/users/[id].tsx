import { FileDetail } from 'src/client/types/FileDetail'
import { GetServerSidePropsResult } from 'next'
import { NextRouter, useRouter } from 'next/router'
import { useContext, useState } from 'react'
import FileDetailCard from 'src/client/components/FileDetailCard'
import UserCtx from 'src/client/context/user'
import getUserFiles from 'src/client/services/getUserFiles'
import useUser from 'src/client/hooks/useUser'

type UserProps = {
	filesApi: Array<FileDetail>
}

export default function User({ filesApi }: UserProps): JSX.Element {

	const router: NextRouter = useRouter()

	const [ files, setFiles ] = useState(filesApi)
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

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<{ filesApi: Array<FileDetail>}>> {
	const id: string = context.params.id

	try {
		const files: Array<FileDetail> = await getUserFiles(id)
		console.log(files)

		return { props: { filesApi: files ? files : [] }}
	} catch (e) {
		return {
			notFound: true
		}
	}
}