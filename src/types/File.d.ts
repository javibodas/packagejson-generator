export interface File {
	_id?: string,
    id?: string,
    json?: {
        name: string,
		version: string,
		description: string,
		author: string,
		main: string,
		dependencies: object,
		devDependencies: object,
		scripts: object,
		license: string,
    },
    createdBy?: string
}