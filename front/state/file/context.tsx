import { File } from 'back/domain/File'
import { FileAction } from 'back/domain/client/reducer/FileAction'
import { fileInitialState } from 'front/state/file/initialState'
import React, { Dispatch, useReducer } from 'react'
import fileReducer from 'front/state/file/reducer'

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