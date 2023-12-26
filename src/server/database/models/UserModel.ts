import { Schema, model, models } from 'mongoose'
import { User } from 'src/server/types/User'


const UserSchema = new Schema<User>({
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