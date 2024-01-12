import { User } from 'src/lib/types/client/User'

export type UseUserProps = {
    user: User,
    setUser(user: User): void
}