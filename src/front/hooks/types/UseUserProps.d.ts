import { User } from 'src/back/domain/User'

export type UseUserProps = {
    user: User,
    setUser(user: User): void
}