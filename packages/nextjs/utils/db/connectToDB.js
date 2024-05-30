import mongoose from 'mongoose'

let isConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if (isConnected) {
        console.log('MongoDB is already connected')
        return
    }

    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}`, {
        // await mongoose.connect(`mongodb://127.0.0.1:27017`, {
            dbName: process.env.MONGODB_DATABASE,
            // dbName: 'las-beras-test',
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        })

        isConnected = true
        console.log('MongoDB connected')
    } catch (e) {
        console.log(e)
    }
}