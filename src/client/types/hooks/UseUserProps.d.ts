import { User } from 'src/client/types/User'

export type UseUserProps = {
    user: User,
    setUser(user: User): void
}