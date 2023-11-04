import { Schema, model, models } from 'mongoose'


const UserSchema = new Schema({
	_id: { type: String }
}, { 
	timestamps: true, 
	versionKey: false,
	toJSON: {
		transform(doc, ret) {
			ret.id = ret._id
			delete ret._id
		}
	}
})


const UserModel = models.User || model('User', UserSchema)
export default UserModel