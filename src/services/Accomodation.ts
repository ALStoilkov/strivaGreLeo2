import express from "express"
import AccomodationModel from "../models/Accomodation"

const accomodationRouter = express.Router()

accomodationRouter.get("/", async (req, res) => {
  const accomodations = await AccomodationModel.find()
  res.status(200).send(accomodations)
})

accomodationRouter.get("/:id", async (req, res) => {
  const accomodation = await AccomodationModel.findById(req.params.id)
  if (!accomodation) {
    res.status(404).send()
    return
  }
  res.status(200).send(accomodation)
})

accomodationRouter.post("/", async (req, res) => {
  const newAccomodation = new AccomodationModel(req.body)
  await newAccomodation.save()

  res.status(201).send(newAccomodation)
})

accomodationRouter.put("/:id", async (req, res) => {
  const accomodation = await AccomodationModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      runValidators: true,
      new: true,
    }
  )
  if (!accomodation) {
    res.status(404).send()
    return
  }
  res.send(accomodation)
})

accomodationRouter.delete("/:id", async (req, res) => {
  const deleted = await AccomodationModel.findByIdAndDelete(req.params.id)

  if (!deleted) {
    res.status(500).send()
    return
  }

  res.status(204).send()
})

export default accomodationRouter
