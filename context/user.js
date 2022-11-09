import React, { useState } from 'react';

const UserCtx = React.createContext();

export function UserContextProvider({children}){

    const [ user, setUser ] = useState({ isLogged: false });
    
    return(<UserCtx.Provider value={{user, setUser}}>{children}</UserCtx.Provider>)
}

export default UserCtx;