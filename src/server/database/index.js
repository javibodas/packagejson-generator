import { connect, connection } from 'mongoose'

const database = {
	isConnected: 0,
}

export default async function databaseConnect() {
	if (database.isConnected) return

	const db = await connect(process.env.MONGODB_URL)
	database.conn = db.connections[0].readyState
}

connection.on('connected', () => {
	console.log('MongoDB is conected...')
})

connection.on('error', (err) => {
	console.log('Some error ocurred: ' + err)
})