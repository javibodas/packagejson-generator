import { File } from 'back/domain/File'
import { FileContextProvider } from 'front/state/file'
import Container from 'front/components/Container'

type HomePageProps = {
	file?: File
}

export default function HomePage({ file }: HomePageProps): JSX.Element { 
	return (
		<FileContextProvider value={file}>
			<Container />
		</FileContextProvider>
	)
}