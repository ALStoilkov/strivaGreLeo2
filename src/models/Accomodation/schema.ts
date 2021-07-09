import mongoose from "mongoose"

const AccomodationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  maxGuests: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
})

export default AccomodationSchema
