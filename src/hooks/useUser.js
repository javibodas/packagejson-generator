import { useRouter } from 'next/router'
import { loginWithGithub, logoutWithGithub, onAuthStateChanged, deleteUserFile, addUserFile, updateFile, getUserFiles } from 'src/firebase/client';

export default function useUser({ user, setUser }) {

    const router = useRouter()
    
    const isLogged = () => { return user.isLogged }

    const login = () => { return loginWithGithub() }

    const logout = () => { return logoutWithGithub() }

    const handleLogIn = function(event) {
        login()
        .then((userLogin) => setUser({...userLogin, isLogged: true}))
        .catch((error) => console.log(error))
    }
    
    const handleLogout = function(event) {
        logout()
        .then((res) => {
            setUser({isLogged: false})
            router.push('/')
        })
        .catch((error) => console.log(error))
    }

    const getUserFiles = function(userId) {
        getUserFiles(userId)
        .then()
        .catch()
    }

    const updateUserFile = function(fileId, newFile) {
        updateFile(fileId, newFile)
        .then()
        .catch()
    }

    const saveUserFile = function(file) {
        addUserFile(file, user.uid)
        .then((element) => window.open(process.env.NEXT_PUBLIC_BASE_URL + '/files/' + element.id, '_blank').focus() )
        .catch((error) => console.log(`Failed saving file into user ${user.uid}: ${error}`) )
    }

    const deleteFile = (fileId) => {
        deleteUserFile(fileId, user.uid)
        .then(() => console.log(`File ${fileId} removed from user ${user.uid}`))
        .catch((error) => console.log(error) )
    }

    return { isLogged, onAuthStateChanged, handleLogIn, handleLogout, deleteFile, saveUserFile }
}