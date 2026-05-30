import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { signIn, signOut, useSession } from 'next-auth/react'
import Button from 'front/components/Button'
import UserOptions from 'front/components/UserOptions'

export default function Header(): JSX.Element {

	const { data: session } = useSession()
	const user = session?.user ? {
		id: session.user.id,
		username: session.user.name,
		email: session.user.email,
		avatar: session.user.image,
	} : undefined

	return(<header className='flex flex-row-reverse py-2 px-0 my-0 mx-auto w-4/5 h-6-vh'>
		<nav className='mx-0 my-auto'>
			{
				!user ?
					<Button name='btn-login' click={async () => { await signIn('github') }} testid='btn-login'>Login With <FontAwesomeIcon icon={faGithub} /></Button>
					:
					<UserOptions user={user} logout={() => signOut({ callbackUrl: '/' })}/>
			}
		</nav>
	</header>)
}
