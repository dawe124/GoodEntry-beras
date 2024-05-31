import { Schema, model, models } from 'mongoose'
import Token from './Token'

const candleSchema = new Schema({
    price: {
        type: String,
    },
    open: {
        type: String,
    },
    close: {
        type: String,
    },
    high: {
        type: String,
    },
    low: {
        type: String,
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    },
    tokenAddress: {
        type: String,
        ref: 'Token'
    },
    ticker: {
        type: String,
    }
})

const Candle = models.Candle || model("Candle", candleSchema)

export default Candle