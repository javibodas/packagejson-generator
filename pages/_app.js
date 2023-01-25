import Head from 'next/head'
import { UserContextProvider } from 'src/client/context/user'
import Header from 'src/client/components/Header'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/global.css'
config.autoAddCss = false

function MyApp({ Component, pageProps }) {
	return (<>
		<Head>
			<title>Package.json generator</title>
			<link rel="icon" href="/favicon.png" />
			<meta name="description" content="Generator and manager of package.json files" />
		</Head>
		<UserContextProvider>
			<Header />
			<Component { ...pageProps } />
		</UserContextProvider>
	</>)
}

export default MyApp