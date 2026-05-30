import { UserContextProvider } from 'front/state/user'
import Header from 'front/components/Header'
import SessionSync from 'front/components/SessionSync'

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