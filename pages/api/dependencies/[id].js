const axios = require('axios')

async function handler(req, res) {
	const {
		query: { id },
	} = req
    
	const resp = {
		error: '',
		data: []
	}

	await axios.get('https://www.npmjs.com/search/suggestions?q='+id)
		.then(response => {

			if (response.data){
				resp.data = response.data.map(p => {
					const { name, version, description} = p
					return { id, name, version, description }
				})
			}else{
				resp.error = 'No packages found'
			}

			res.status(200).json(resp)
		})
		.catch(error => {
			resp.error = 'No packages found'
			res.status(200).json(resp)
		})
}

export default handler