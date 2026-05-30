import '@fortawesome/fontawesome-svg-core/styles.css'
import 'front/styles/global.css'
import { Long_Cang } from '@next/font/google'
import { SessionProvider } from 'next-auth/react'
import Head from 'next/head'
import Layout from 'front/components/Layout'
import type { AppProps } from 'next/app'

const fontLongCang = Long_Cang({ // eslint-disable-line @typescript-eslint/no-unused-vars
	subsets: [ 'latin' ],
	weight: '400',
	display: 'swap',
	variable: '--font-tilt-neon',
})

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps): JSX.Element {
	return (<>
		<SessionProvider session={session}>
			<Head>
				<title>Package.json generator</title>
				<meta name="description" content="Generator and manager of package.json files" />
			</Head>
			<Layout>
				<Component { ...pageProps } />
			</Layout>
		</SessionProvider>
	</>)
}