export default class FileDoesntBelongToUserError extends Error {
	constructor() {
		super('File does not belong to user')
        
		this.name = 'FileDoesntBelongToUser'
	}
}