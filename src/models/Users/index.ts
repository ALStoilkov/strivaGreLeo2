import mongoose from "mongoose"
import UserSchema from "./schema"

const UserModel = mongoose.model("user", UserSchema)

export default UserModel