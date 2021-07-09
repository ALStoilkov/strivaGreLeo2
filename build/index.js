"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_list_endpoints_1 = __importDefault(require("express-list-endpoints"));
var mongoose_1 = __importDefault(require("mongoose"));
var server_1 = __importStar(require("./server"));
// import dotenv from "dotenv"
// dotenv.config()
process.env.TS_NODE_DEV && require("dotenv").config();
var port = process.env.PORT || 3030;
var ATLAS_URL = process.env.ATLAS_URL;
if (!ATLAS_URL)
    throw new Error("No Atlas URL specified");
mongoose_1.default
    .connect(ATLAS_URL, { useNewUrlParser: true })
    .then(function () {
    console.log("Connected to mongo");
    // Listen using the httpServer -
    // listening with the express instance will start a new one!!
    server_1.default.listen(port, function () {
        console.log(express_list_endpoints_1.default(server_1.app));
        console.log("Server listening on port " + port);
    });
});
