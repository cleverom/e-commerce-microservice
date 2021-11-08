"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ProductSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
exports.default = mongoose_1.default.model("product", ProductSchema);
