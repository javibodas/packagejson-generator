import Head from 'next/head';
import Container from 'components/Container';
import { JSONContextProvider } from 'context';
import Header from 'components/Header';

export default function HomePage(props) {
	  
  	return (<>
                <Head>
                    <title>Package.json generator</title>
                    <link rel="icon" href="/favicon.png" />
                    <meta name="description" content="Generator and manager of package.json files" />
                </Head>
                <Header />
                <JSONContextProvider value={props.jsonFile}>
                    <Container />
                </JSONContextProvider>
            </>)
}