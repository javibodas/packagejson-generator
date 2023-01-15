import Container from 'src/components/Container';
import { JSONContextProvider } from 'src/context';

export default function HomePage(props) {
	  
  	return (
        <JSONContextProvider value={props.jsonFile}>
            <Container />
        </JSONContextProvider>
    )
}