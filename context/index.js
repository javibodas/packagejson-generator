import React, { useReducer } from 'react';
import jsonStateReducer from 'reducer';
import { jsonInitialState } from 'state';

const JSONCtx = React.createContext();

export function JSONContextProvider({children}){

    const [ state, dispatch ] = useReducer(jsonStateReducer, jsonInitialState);
    
    return(<JSONCtx.Provider value={{state, dispatch}}>{children}</JSONCtx.Provider>)
}

export default JSONCtx;