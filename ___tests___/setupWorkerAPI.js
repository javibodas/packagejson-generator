import { rest } from 'msw'
import { setupServer } from 'msw/node'

const defaultPackageStructure = { id: 0, name: 'react', version: '9.9.9', description: '' }
const apiResult = { data: [defaultPackageStructure] }

export const server = setupServer(
	rest.get('/api/dependencies/:pack', (req, res, ctx) => {
		const { pack } = req.params
		apiResult.data[0].name = pack

		res.status = 200
		return res(ctx.json(apiResult))
	})
)