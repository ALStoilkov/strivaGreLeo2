import mongoose from "mongoose"
import MessageSchema from "../Message/schema"

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chatHistory: {
        type: [MessageSchema],
        required: true,
        default: []
    }
})

export default RoomSchema