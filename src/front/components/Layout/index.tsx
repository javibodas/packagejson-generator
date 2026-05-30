import { UserContextProvider } from 'src/front/state/user'
import Header from 'src/front/components/Header'
import SessionSync from 'src/front/components/SessionSync'

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