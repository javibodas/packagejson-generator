import { useState, useEffect } from 'react';
import Avatar from 'components/Avatar';
import {loginWithGithub, onAuthStateChanged} from 'firebase/client';


export default function Header(){

    const USER_STATE = {
        NOT_LOGGED: null,
        NOT_KNOWN: undefined
    }
    const [ user, setUser ] = useState(USER_STATE.NOT_KNOWN)
    
    useEffect(function(){
        onAuthStateChanged(user => setUser(user))
    }, [])

    const handleSignIn = function(event){
        loginWithGithub()
        .then((user) => {   console.log(user); setUser(user) })
        .catch((error) => console.log(error))
    }

    return(<>
            <header className='header'>
                <h3>package.json generator</h3>
                {/*<div className='nav'>
                    {
                        user === USER_STATE.NOT_LOGGED ?
                            <button onClick={handleSignIn}>LogIn With Github</button>
                        :
                            user === USER_STATE.NOT_KNOWN ? <Avatar />
                            : <Avatar avatar={user.avatar} name={user.username}/>
                    }
                </div>*/}
            </header>
            <style jsx>
                {`
                    .header{
                        max-width: 100vw;
                        display: flex; flex-direction: row; justify-content: space-between;
                        background: linear-gradient(139deg, #fb8817, #ff4b01, #c12127, #e02aff);
                        padding: 0.5rem 2rem 0.5rem 3rem;
                    }

                    .header h3{
                        color: black;
                        font-family: "Lucida Console", Monaco, monospace;
                        font-style: italic;
                        margin: auto 0;
                    }
                
                `}
            </style>
            </>)
}