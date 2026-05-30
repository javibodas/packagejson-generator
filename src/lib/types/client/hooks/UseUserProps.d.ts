import { User } from 'src/lib/types/User'

export type UseUserProps = {
    user: User,
    setUser(user: User): void
}