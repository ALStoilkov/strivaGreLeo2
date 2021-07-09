import express from "express"
import AccomodationModel from "../models/Accomodation"

export interface Accomodation {
  name: string
  descritpion: string
  maxGuests: number
  city: string
}

const destinationsRouter = express.Router()

destinationsRouter.get("/", async (req, res) => {
  const destinations: string[] = []
  const accomodations = await AccomodationModel.find()
  accomodations.forEach((acc: Accomodation) => {
    destinations.push(acc.city)
  })
  if (!accomodations) {
    res.status(404).send()
    return
  }
  const uniqDest: string[] = destinations.filter(
    (value, index, self) => self.indexOf(value) === index
  )
  res.status(200).send(uniqDest)
})

destinationsRouter.get("/:city", async (req, res) => {
  const accomodations = await AccomodationModel.find({ city: req.params.city })
  if (accomodations.length === 0) {
    res.status(404).send()
    return
  }
  res.status(200).send(accomodations)
})

export default destinationsRouter
