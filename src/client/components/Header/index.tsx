import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { useContext, useEffect } from 'react'
import Button from 'src/client/components/Button'
import UserCtx from 'src/client/context/user'
import UserOptions from 'src/client/components/UserOptions'
import useUser from 'src/client/hooks/useUser'


export default function Header(): JSX.Element {

	const { user, setUser } = useContext(UserCtx)
	const { handleLogIn, handleLogout, onAuthStateChanged } = useUser({ user, setUser })

	useEffect(() => onAuthStateChanged((userUpdated) => {
		(userUpdated) ? setUser(userUpdated)
			: setUser(undefined)
	}), [])

	return(<>
		<header>
			<nav>
				{
					!user ?
						<Button name='btn-login' click={handleLogIn} testid='btn-login'>Login With <FontAwesomeIcon icon={faGithub} /></Button>
						:
						<UserOptions user={user} logout={handleLogout}/>
				}
			</nav>
		</header>
		<style jsx>
			{`
                    header {
                        max-width: 80%;
                        height: 6vh;
                        display: flex; flex-direction: row-reverse;
                        padding: 0.5rem 0 0.5rem 0;
                        margin: 0 auto;
                    }
                    
                    nav {
                        margin: auto 0;
                    }

                    @media (max-width: 1000px) {
                        max-width: 90%!important;
                        margin: 0 auto;
                    }
                `}
		</style>
	</>)
}