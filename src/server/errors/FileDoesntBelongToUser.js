export default class FileDoesntBelongToUser extends Error {
	constructor() {
		super('File does not belong to user')
        
		this.name = 'FileDoesntBelongToUser'
	}
}