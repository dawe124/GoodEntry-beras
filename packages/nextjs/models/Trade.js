import { Schema, model, models } from 'mongoose'
import Token from './Token'

const tradeSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    tokenAddress: {
        type: String,
        ref: 'Token'
    },
    user: {
        type: String
    },
    txHash: {
        type: String
    }
})

const Trade = models.Trade || model("Trade", tradeSchema)

export default Trade