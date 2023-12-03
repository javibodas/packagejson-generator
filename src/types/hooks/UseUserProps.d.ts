import { GithubUser } from '../firebase/GithubUser'

export type UseUserProps = {
    user: GithubUser,
    setUser: function
}