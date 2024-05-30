import { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String
    }
}, { timestamps: true })

const User = models.User || model("User", userSchema)

export default User