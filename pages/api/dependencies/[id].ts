import { Dependencie } from 'src/server/types/Dependencie'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
	error: string,
	data: Array<Dependencie>
}


export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> {
	const { query: { id } } = req
	const resp: ResponseData = { error: '', data: [] }

	await axios.get(`https://www.npmjs.com/search/suggestions?q=${id}`)
		.then(response => {
			if (response.data) {
				resp.data = response.data.map(p => {
					const { name, version, description }: Dependencie = p
					return { id, name, version, description }
				})
			} else {
				resp.error = 'No packages found'
			}

			res.status(200).json(resp)
		})
		.catch(() => {
			resp.error = 'No packages found'
			res.status(200).json(resp)
		})
}