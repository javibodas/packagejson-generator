import { NpmPackage} from 'src/lib/types/server/NpmPackage'
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = Array<NpmPackage> | { error: string }


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
					const { name, version, description }: NpmPackage = p.package
					return { id, name, version, description }
				}))
		})
		.catch((reason) => {
			console.log(reason)
			res.status(500).json({ error: 'No packages found' })
		})
}