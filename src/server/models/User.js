import { Schema, model, models } from 'mongoose'


const UserSchema = new Schema({
	_id: { type: String },
	files: { type: Array, default: [] }
}, { timestamps: true, versionKey: false })


const UserModel = models.User || model('User', UserSchema)
export default UserModel