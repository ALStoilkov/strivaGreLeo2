import cors from "cors"
import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import RoomModel from "./models/Room"
import chatRouter from "./services/Chat"
import usersRouter from "./services/Users"
import shared from "./shared"


// import dotenv from "dotenv"
// dotenv.config()

process.env.TS_NODE_DEV && require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json())


const server = createServer(app);
const io = new Server(server, { allowEIO3: true })

type Room = "blue" | "red"

export interface ActiveUser {
    username: string,
    id: string,
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
io.on("connection", socket => {

    console.log(socket.id)

    console.log(socket.rooms)

    // socket.on("join-room", (room) => {
    //     socket.join(room)
    //     console.log(socket.rooms)
    // })

    socket.on("setUsername", ({ username, room }) => {
        shared.onlineUsers.push({ username: username, id: socket.id, room })

        //.emit - echoing back to itself
        socket.emit("loggedin")

        //.broadcast.emit - emitting to everyone else
        socket.broadcast.emit("newConnection")

        socket.join(room)

        console.log(socket.rooms)

        //io.sockets.emit - emitting to everybody in the known world
        //io.sockets.emit("newConnection")
    })

    socket.on("disconnect", () => {
        console.log("Disconnecting...");
        shared.onlineUsers = shared.onlineUsers.filter((user: ActiveUser) => user.id !== socket.id)
    })

    socket.on("sendMessage", async ({ message, room }) => {

        await RoomModel.findOneAndUpdate({ name: room }, {
            $push: { chatHistory: message }
        })

        socket.to(room).emit("message", message)
    })


})


app.use('/users', usersRouter)

app.use('/', chatRouter)

export { app }
export default server