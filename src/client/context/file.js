import React, { useReducer } from 'react'
import fileReducer from 'src/client/reducer'
import { fileInitialState } from 'src/client/state'

const FileCtx = React.createContext()

export function FileContextProvider({children, value}){

	const [ file, dispatch ] = useReducer(fileReducer, value ?? fileInitialState)
    
	return(<FileCtx.Provider value={{file, dispatch}}>{children}</FileCtx.Provider>)
}

export default FileCtx