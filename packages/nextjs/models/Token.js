import { Schema, model, models } from 'mongoose'

const tokenSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    creator: {
        type: String
    },
    icon: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    creation_date: {
        type: Number,
        required: true
    },
    last_trade: {
        type: Number,
    },
})

const Token = models.Token || model("Token", tokenSchema)

export default Token