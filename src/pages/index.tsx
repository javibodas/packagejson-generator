import { File } from 'src/lib/types/client/File'
import { FileContextProvider } from 'src/context/file'
import Container from 'src/components/Container'

type HomePageProps = {
	file: File
}

export default function HomePage({ file }: HomePageProps): JSX.Element { 
	return (
		<FileContextProvider value={file}>
			<Container />
		</FileContextProvider>
	)
}