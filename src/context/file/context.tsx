import { File } from 'src/lib/types/File'
import { FileAction } from 'src/lib/types/client/reducer/FileAction'
import { fileInitialState } from 'src/context/file/initialState'
import React, { Dispatch, useReducer } from 'react'
import fileReducer from 'src/context/file/reducer'

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