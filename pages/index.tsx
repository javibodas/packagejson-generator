import { File } from 'src/client/types/File'
import { FileContextProvider } from 'src/client/context/file'
import Container from 'src/client/components/Container'

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