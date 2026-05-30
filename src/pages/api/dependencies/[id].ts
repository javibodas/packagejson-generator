import { Dependencie } from 'back/domain/Dependencie'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = Array<Dependencie> | { error: string }


export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>): Promise<void> {
	const { query: { id } } = req

	await axios.get(`https://registry.npmjs.org/-/v1/search?text=${id}`)
		.then(response => {
			const npmPackages = response.data?.objects
			if (!npmPackages) {
				res.status(500).json({ error: 'No packages found' })
				return
			}

			res.status(200)
				.json(npmPackages.map(p => {
					const { name, version, description }: Dependencie = p.package
					return { id, name, version, description }
				}))
		})
		.catch((reason) => {
			console.log(reason)
			res.status(500).json({ error: 'No packages found' })
		})
}