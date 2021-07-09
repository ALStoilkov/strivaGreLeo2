"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var schema_1 = __importDefault(require("../Message/schema"));
var RoomSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    chatHistory: {
        type: [schema_1.default],
        required: true,
        default: []
    }
});
exports.default = RoomSchema;
