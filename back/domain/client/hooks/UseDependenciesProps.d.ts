import { File } from 'back/domain/File'

export type UseDependenciesProps = {
    classType: string, 
    type: string, 
    dispatch: function, 
    file: File
}