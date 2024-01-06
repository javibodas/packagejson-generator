import { Dependencie } from 'src/server/types/Dependencie'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = Array<Dependencie> | { error: string }


export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> {
	const { query: { id } } = req

	await axios.get(`https://www.npmjs.com/search/suggestions?q=${id}`)
		.then(response => {
			if (response.data) {
				const mapNpmPackages = response.data.map(p => {
					const { name, version, description }: Dependencie = p
					return { id, name, version, description }
				})

				res.status(200).json(mapNpmPackages)
			} else {
				res.status(500).json({ error: 'No packages found' })
			}
		})
		.catch(() => {
			res.status(500).json({ error: 'No packages found' })
		})
}