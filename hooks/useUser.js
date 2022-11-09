import { loginWithGithub, logoutWithGithub, onAuthStateChanged } from 'firebase/client';

export default function useUser({ user, setUser }) {
    
    const isLogged = () => { return user.isLogged }

    const login = () => { return loginWithGithub() }

    const logout = () => { return logoutWithGithub() }

    const handleLogIn = function(event) {
        login()
        .then((userLogin) => { setUser({...userLogin, isLogged: true}) })
        .catch((error) => console.log(error))
    }
    
    const handleLogout = function(event) {
        logout()
        .then((res) => setUser({isLogged: false}))
        .catch((error) => console.log(error))
    }

    return { isLogged, onAuthStateChanged, handleLogIn, handleLogout }
}