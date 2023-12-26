import { User } from 'src/client/types/User'
import React, { useState } from 'react'

type UserContext = {
	user?: User,
	setUser?: (user: User) => void,
}

type UserContextProviderProps = {
	children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[], 
	value?: User | undefined
}

const UserCtx = React.createContext<UserContext>({})

export function UserContextProvider({ children, value }: UserContextProviderProps) {

	const [ user, setUser ] = useState(value)
    
	return(<UserCtx.Provider value={{ user, setUser }}>{children}</UserCtx.Provider>)
}

export default UserCtx