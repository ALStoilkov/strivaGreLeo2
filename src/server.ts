import cors from "cors"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import destinationsRouter from "./services/Destinations"
import accomodationRouter from "./services/Accomodation"
import shared from "./shared"

import dotenv from "dotenv"
dotenv.config()

// process.env.TS_NODE_DEV && require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

const server = createServer(app)
const io = new Server(server, { allowEIO3: true })

type Room = "blue" | "red"

export interface ActiveUser {
  username: string
  id: string
  room: Room
}

// interface IActiveUserExtendedWithFullName extends IActiveUser {
//     fullName: string
// }

// class ActiveUser implements IActiveUserExtendedWithFullName {
//     constructor(
//         public username: string,
//         public id: string,
//         public room: Room,
//         public fullName: string
//     ){}
// }

// const myUser = new ActiveUser("myusername", 'id123', "red", "fullnamestring")

// myUser is
/* 
{
    username: "myusername",
    id: "id123",
    room: "red",
    fullname: "fullnamestring"
}
*/

shared.onlineUsers = [] as ActiveUser[]

// Add "event listeners" on your socket when it's connecting

app.use("/accomodation", accomodationRouter)
app.use("/destinations", destinationsRouter)

export { app }
export default server
