import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/global.css'
import { Long_Cang } from '@next/font/google'
import Head from 'next/head'
import Layout from 'src/client/components/Layout'
import type { AppProps } from 'next/app'

const fontLongCang = Long_Cang({ // eslint-disable-line @typescript-eslint/no-unused-vars
	subsets: [ 'latin' ],
	weight: '400',
	display: 'swap',
	variable: '--font-tilt-neon',
})

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (<>
		<Head>
			<title>Package.json generator</title>
			<meta name="description" content="Generator and manager of package.json files" />
		</Head>
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	</>)
}