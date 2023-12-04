import React, { useState } from 'react'
import { User } from 'src/types/User'

type UserContext = {
	user?: User,
	setUser?: (user: User) => void,
}

type UserContextProviderProps = {
	children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[], 
	value?: User
}

const UserCtx = React.createContext<UserContext>({})

export function UserContextProvider({ children, value }: UserContextProviderProps) {

	const [ user, setUser ] = useState(value ?? {} as User)
    
	return(<UserCtx.Provider value={{ user, setUser }}>{children}</UserCtx.Provider>)
}

export default UserCtx