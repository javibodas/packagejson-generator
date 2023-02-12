import React, { useState } from 'react'

const UserCtx = React.createContext()

export function UserContextProvider({ children, value }){

	const [ user, setUser ] = useState(value ?? { isLogged: false })
    
	return(<UserCtx.Provider value={{user, setUser}}>{children}</UserCtx.Provider>)
}

export default UserCtx