import Container from 'src/client/components/Container'
import { FileContextProvider } from 'src/client/context/file'

export default function HomePage({ file }) { 
	return (
		<FileContextProvider value={file}>
			<Container />
		</FileContextProvider>
	)
}