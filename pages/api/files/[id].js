import { getFile } from 'firebase/client';

async function handler(req, res) {
    const { query: { id }, } = req
    const resp = { error: '', data: {} }

    resp.data = await getFile(id)

    res.status(200).json(resp)
}

export default handler