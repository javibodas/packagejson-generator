import { useContext, useEffect } from 'react'
import UserCtx from 'src/context/user'
import useUser from 'src/hooks/useUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import UserOptions from 'src/components/UserOptions'
import Button from 'src/components/Button'


export default function Header(){

	const { user, setUser } = useContext(UserCtx)
	const { isLogged, handleLogIn, handleLogout, onAuthStateChanged } = useUser({ user, setUser })

	useEffect(function(){
		onAuthStateChanged((userUpdated) => {
			(userUpdated) ? setUser({...userUpdated, isLogged: true })
				: setUser({isLogged: false})
		})
	})

	return(<>
		<header>
			<nav>
				{
					!isLogged() ?
						<Button name='btn-login' click={handleLogIn}>Login With <FontAwesomeIcon icon={faGithub} /></Button>
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