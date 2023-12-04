import { File } from 'src/types/File'

export type FileAction = {
	type: 'updateProjectName' | 'updateProjectVersion' | 'updateProjectDescription' | 'updateProjectAuthor'
			| 'updateProjectMainFile' | 'addDependencie' | 'removeDependencie' | 'addDevDependencie'
			| 'removeDevDependencie' | 'addScript' | 'removeScript' | 'updateJSON' | 'clearJSON'
	key?: string,
	value: string | File;
}