export default class FileNotExistError extends Error {
	constructor() {
		super('File does not exist')
        
		this.name = 'FileNotExist'
	}
}