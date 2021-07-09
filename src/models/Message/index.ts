import mongoose from "mongoose";
import MessageSchema from './schema'

export default mongoose.model("message", MessageSchema)