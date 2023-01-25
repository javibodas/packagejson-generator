export default class FileNotExist extends Error {
	constructor() {
		super('File does not exist')
        
		this.name = 'FileNotExist'
	}
}