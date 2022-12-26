import Head from 'next/head';
import Container from 'components/Container';
import { JSONContextProvider } from 'context';
import { UserContextProvider } from 'context/user';
import Header from 'components/Header';

export default function HomePage(props) {
	  
  	return (<>
                <Head>
                    <title>Package.json generator</title>
                    <link rel="icon" href="/favicon.png" />
                    <meta name="description" content="Generator and manager of package.json files" />
                </Head>
                <UserContextProvider>
                    <Header />
                    <JSONContextProvider value={props.jsonFile}>
                        <Container />
                    </JSONContextProvider>
                </UserContextProvider>
            </>)
}