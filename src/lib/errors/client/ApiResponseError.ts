export default class ApiResponseError extends Error {
    
	private response: Response

	constructor(message, res) {
		super(message)

		this.response = res
	}
}