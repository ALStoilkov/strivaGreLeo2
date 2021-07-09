import mongoose from "mongoose"
import AccomodationSchema from "./schema"

const AccomodationModel = mongoose.model("accomodation", AccomodationSchema)

export default AccomodationModel
