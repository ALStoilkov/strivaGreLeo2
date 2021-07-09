import cors from "cors"
import express from "express"
import { createServer } from "http"
import destinationsRouter from "./services/Destinations"
import accomodationRouter from "./services/Accomodation"

import dotenv from "dotenv"
dotenv.config()

// process.env.TS_NODE_DEV && require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const server = createServer(app)

app.use("/accomodation", accomodationRouter)
app.use("/destinations", destinationsRouter)

export { app }
export default server
