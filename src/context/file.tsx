import { File } from 'src/lib/types/client/File'
import { FileAction } from 'src/lib/types/client/reducer/FileAction'
import { fileInitialState } from 'src/lib/state'
import React, { Dispatch, useReducer } from 'react'
import fileReducer from 'src/reducer'

type FileContext = {
	file?: File,
	dispatch?: Dispatch<FileAction>,
}

type FileContextProviderProps = {
	children: string | JSX.Element | JSX.Element[] | (string | JSX.Element)[], 
	value?: File
}

const FileCtx = React.createContext<FileContext>({})

export function FileContextProvider({ children, value }: FileContextProviderProps){

	const [ file, dispatch ] = useReducer(fileReducer, value ?? fileInitialState)
    
	return(<FileCtx.Provider value={{ file, dispatch }}>{children}</FileCtx.Provider>)
}

export default FileCtx