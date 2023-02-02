import { Schema, model, models } from 'mongoose'


const FileSchema = new Schema({
	json: {
		name: { type: String, trim: true },
		version: { type: String, trim: true },
		description: { type: String, trim: true },
		author: { type: String, trim: true },
		main: { type: String, trim: true },
		dependencies: { type: Object },
		devDependencies: { type: Object },
		scripts: { type: Object },
		license: { type: String, trim: true },
	}
}, { timestamps: true, versionKey: false, strict: false })

const FileModel = models.File || model('File', FileSchema)
export default FileModel