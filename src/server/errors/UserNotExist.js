export default class UserNotExist extends Error {
	constructor() {
		super('User does not exist')
        
		this.name = 'UserNotExist'
	}
}