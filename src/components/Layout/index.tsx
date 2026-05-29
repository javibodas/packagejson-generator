import { UserContextProvider } from 'src/context/user'
import Header from 'src/components/Header'
import SessionSync from 'src/components/SessionSync'

type LayoutProps = {
	children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[]
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<UserContextProvider>
			<SessionSync />
			<Header />
			<main>{children}</main>
		</UserContextProvider>
	)
}