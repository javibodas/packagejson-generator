import { useState, useEffect } from 'react';
import { loginWithGithub, logoutWithGithub, onAuthStateChanged } from 'firebase/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import User from 'components/User'
import Button from 'components/Button';


export default function Header(){

    const USER_STATE = { NOT_LOGGED: null }
    const [ user, setUser ] = useState(USER_STATE.NOT_LOGGED)
    
    useEffect(function(){
        onAuthStateChanged(user => setUser(user))
    }, [])

    const handleSignIn = function(event) {
        loginWithGithub()
        .then((user) => { setUser(user) })
        .catch((error) => console.log(error))
    }

    return(<>
            <header>
                <nav>
                    {
                        user === USER_STATE.NOT_LOGGED ?
                            <Button name='btn-login' click={handleSignIn}>LogIn With <FontAwesomeIcon icon={faGithub} /></Button>
                        :
                            <User user={user} logout={logoutWithGithub}/>
                    }
                </nav>
            </header>
            <style jsx>
                {`
                    header {
                        max-width: 100vw;
                        height: 6vh;
                        display: flex; flex-direction: row-reverse;
                        padding: 0.5rem 2rem 0.5rem 3rem;
                    }
                    
                    nav {
                        float: right;
                        margin: auto 0;
                    }
                `}
            </style>
            </>)
}