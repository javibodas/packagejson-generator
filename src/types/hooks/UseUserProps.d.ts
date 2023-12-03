import { User } from 'src/types/User'

export type UseUserProps = {
    user: User,
    setUser(user: User): void
}