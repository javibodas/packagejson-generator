import { File as FileType } from 'src/client/types/File'
import { GetServerSidePropsResult } from 'next'
import HomePage from 'pages'
import getFile from 'src/client/services/getFile'

type FileProps = {
	file: FileType
}
 
export default function File({ file }: FileProps): JSX.Element {
	return(<HomePage file={file} />)
}

export async function getServerSideProps(context): Promise<GetServerSidePropsResult<{ file: FileType}>> {
	const id: string = context.params.id

	try {
		const file: FileType = await getFile(id)

		return { props: { file }}
	} catch (e) {
		return {
			notFound: true
		}
	}
}