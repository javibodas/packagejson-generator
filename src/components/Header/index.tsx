import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useContext, useEffect } from 'react'
import Button from 'src/components/Button'
import UserCtx from 'src/context/user'
import UserOptions from 'src/components/UserOptions'
import useUser from 'src/hooks/useUser'


export default function Header(): JSX.Element {

	const { user, setUser } = useContext(UserCtx)
	const { handleLogIn, handleLogout, onAuthStateChanged } = useUser({ user, setUser })

	useEffect(() => onAuthStateChanged((userUpdated) => {
		(userUpdated) ? setUser(userUpdated)
			: setUser(undefined)
	}), [])

	return(<header className='flex flex-row-reverse py-2 px-0 my-0 mx-auto w-4/5 h-6-vh'>
		<nav className='mx-0 my-auto'>
			{
				!user ?
					<Button name='btn-login' click={handleLogIn} testid='btn-login'>Login With <FontAwesomeIcon icon={faGithub} /></Button>
					:
					<UserOptions user={user} logout={handleLogout}/>
			}
		</nav>
	</header>)
}