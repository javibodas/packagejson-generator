import { useContext, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import UserCtx from 'src/front/state/user'

export default function SessionSync(): null {
	const { data: session } = useSession()
	const { setUser } = useContext(UserCtx)

	useEffect(() => {
		if (session?.user) {
			setUser({
				id: session.user.id,
				username: session.user.name,
				email: session.user.email,
				avatar: session.user.image,
			})
		} else if (session === null) {
			setUser(undefined)
		}
	}, [session, setUser])

	return null
}
