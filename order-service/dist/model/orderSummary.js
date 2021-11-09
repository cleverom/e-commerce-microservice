"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var OrderSummarySchema = new Schema({
    productId: String,
    customerId: String,
    orderId: String,
    price: Number,
    orderStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Canceled', 'Failed']
    },
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
exports.default = mongoose_1.default.model("orderSummary", OrderSummarySchema);
