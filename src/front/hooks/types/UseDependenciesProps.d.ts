import { File } from 'src/back/domain/File'

export type UseDependenciesProps = {
    classType: string, 
    type: string, 
    dispatch: function, 
    file: File
}