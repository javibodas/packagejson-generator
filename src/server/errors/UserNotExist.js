export default class UserNotExistError extends Error {
	constructor() {
		super('User does not exist')
        
		this.name = 'UserNotExist'
	}
}