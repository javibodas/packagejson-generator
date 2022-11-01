import React, { useReducer } from 'react';
import jsonStateReducer from 'reducer';
import { jsonInitialState } from 'state';

const JSONCtx = React.createContext();

export function JSONContextProvider({children, value}){

    const [ state, dispatch ] = useReducer(jsonStateReducer, value ?? jsonInitialState);
    
    return(<JSONCtx.Provider value={{state, dispatch}}>{children}</JSONCtx.Provider>)
}

export default JSONCtx;