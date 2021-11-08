"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var PaymentSchema = new Schema({
    customerId: String,
    orderId: String,
    amount: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
exports.default = mongoose_1.default.model("payment", PaymentSchema);
