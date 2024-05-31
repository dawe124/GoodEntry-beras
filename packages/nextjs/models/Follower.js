import { Schema, model, models } from 'mongoose'

const followerSchema = new Schema({
    tokenAddress: {
        type: String,
        required: true,
        ref: 'User'
    },
    follower: {
        type: String,
        ref: 'User'
    }
  }, { timestamps: true })
  
  const Follower = models.Follower || model("Follower", followerSchema)