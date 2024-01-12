import { UserContextProvider } from 'src/context/user'
import Header from 'src/components/Header'

type LayoutProps = {
	children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[]
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<UserContextProvider>
			<Header />
			<main>{children}</main>
		</UserContextProvider>
	)
}