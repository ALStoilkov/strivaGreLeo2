"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var Room_1 = __importDefault(require("./models/Room"));
var Chat_1 = __importDefault(require("./services/Chat"));
var Users_1 = __importDefault(require("./services/Users"));
var shared_1 = __importDefault(require("./shared"));
// import dotenv from "dotenv"
// dotenv.config()
process.env.TS_NODE_DEV && require("dotenv").config();
var app = express_1.default();
exports.app = app;
app.use(cors_1.default());
app.use(express_1.default.json());
var server = http_1.createServer(app);
var io = new socket_io_1.Server(server, { allowEIO3: true });
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
shared_1.default.onlineUsers = [];
// Add "event listeners" on your socket when it's connecting
io.on("connection", function (socket) {
    console.log(socket.id);
    console.log(socket.rooms);
    // socket.on("join-room", (room) => {
    //     socket.join(room)
    //     console.log(socket.rooms)
    // })
    socket.on("setUsername", function (_a) {
        var username = _a.username, room = _a.room;
        shared_1.default.onlineUsers.push({ username: username, id: socket.id, room: room });
        //.emit - echoing back to itself
        socket.emit("loggedin");
        //.broadcast.emit - emitting to everyone else
        socket.broadcast.emit("newConnection");
        socket.join(room);
        console.log(socket.rooms);
        //io.sockets.emit - emitting to everybody in the known world
        //io.sockets.emit("newConnection")
    });
    socket.on("disconnect", function () {
        console.log("Disconnecting...");
        shared_1.default.onlineUsers = shared_1.default.onlineUsers.filter(function (user) { return user.id !== socket.id; });
    });
    socket.on("sendMessage", function (_a) {
        var message = _a.message, room = _a.room;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, Room_1.default.findOneAndUpdate({ name: room }, {
                            $push: { chatHistory: message }
                        })];
                    case 1:
                        _b.sent();
                        socket.to(room).emit("message", message);
                        return [2 /*return*/];
                }
            });
        });
    });
});
app.use('/users', Users_1.default);
app.use('/', Chat_1.default);
exports.default = server;
