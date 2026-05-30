import { File } from 'src/back/domain/File'
import { FileContextProvider } from 'src/front/state/file'
import Container from 'src/front/components/Container'

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