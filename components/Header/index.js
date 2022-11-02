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
                            <Button name='btn-login' click={handleSignIn}>Login With <FontAwesomeIcon icon={faGithub} /></Button>
                        :
                            <User user={user} logout={logoutWithGithub}/>
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