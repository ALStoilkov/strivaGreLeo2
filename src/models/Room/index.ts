import mongoose from "mongoose"
import RoomSchema from "./schema"

export default mongoose.model("room", RoomSchema)