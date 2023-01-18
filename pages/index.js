import Container from 'src/components/Container'
import { FileContextProvider } from 'src/context/file'

export default function HomePage({ file }) { 
	return (
		<FileContextProvider value={file}>
			<Container />
		</FileContextProvider>
	)
}