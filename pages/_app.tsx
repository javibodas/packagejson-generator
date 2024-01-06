import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/global.css'
import { Long_Cang } from '@next/font/google'
import Head from 'next/head'
import Layout from 'src/client/components/Layout'
import type { AppProps } from 'next/app'

const fontLongCang = Long_Cang({
	subsets: [ 'latin' ],
	weight: '400',
	display: 'swap',
	variable: '--font-tilt-neon',
})

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