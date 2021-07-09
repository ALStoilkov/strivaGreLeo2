import express from "express"
import UserModel from "../models/Users"
import { ActiveUser } from "../server"
import shared from "../shared"

const usersRouter = express.Router()

usersRouter.get('/online', (req, res) => {
    const onlineUsers = shared.onlineUsers
    res.status(200).send({ onlineUsers })
})

usersRouter.get('/:id', async (req, res) => {
    const user = await UserModel.findById(req.params.id)
    if (!user) {
        res.status(404).send()
        return
    }
    res.status(200).send(user)
})

usersRouter.post("/", async (req, res) => {
    const newUser = new UserModel(req.body)
    await newUser.save()

    res.status(201).send(newUser)
})

usersRouter.delete("/:id", async (req, res) => {
    const deleted = await UserModel.findByIdAndDelete(req.params.id)

    if (!deleted) {
        res.status(500).send()
        return
    }

    res.status(204).send()

})

export default usersRouter