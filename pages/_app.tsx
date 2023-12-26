import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/global.css'
import Head from 'next/head'
import Layout from 'src/client/components/Layout'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (<>
		<Head>
			<title>Package.json generator</title>
			<link rel="icon" href="/favicon.png" />
			<meta name="description" content="Generator and manager of package.json files" />
		</Head>
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	</>)
}

export default MyApp