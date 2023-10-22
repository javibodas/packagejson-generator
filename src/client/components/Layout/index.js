import { UserContextProvider } from 'src/client/context/user'
import Header from 'src/client/components/Header'

export default function Layout({ children }) {
	return (
		<UserContextProvider>
			<Header />
			<main>{children}</main>
		</UserContextProvider>
	)
}