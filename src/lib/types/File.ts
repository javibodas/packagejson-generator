export interface FileJson {
	name: string
	version: string
	description: string
	author: string
	main: string
	dependencies: object
	devDependencies: object
	scripts: object
	license: string
}

export interface File {
	id?: string
	json: FileJson
	createdBy?: string
	createdAt?: string
	updatedAt?: string
}
