import { User } from 'back/domain/User'

export type UseUserProps = {
    user: User,
    setUser(user: User): void
}