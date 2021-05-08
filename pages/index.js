import Container from 'components/Container';
import { JSONContextProvider } from 'context';
import Header from 'components/Header';

export default function HomePage(props) {
	  
  	return (<>
                <Header />
                <JSONContextProvider>
                    <Container />
                </JSONContextProvider>
            </>)
}