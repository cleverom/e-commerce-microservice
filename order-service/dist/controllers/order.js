"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
var order_1 = __importDefault(require("../model/order"));
var connection;
var channel;
function createOrder(products, userEmail) {
    var total = 0;
    try {
        for (var t = 0; t < products.length; ++t) {
            total += products[t].price;
        }
        var newOrder = new order_1.default({
            products: products,
            user: userEmail,
            total_price: total,
        });
        newOrder.save();
        return newOrder;
    }
    catch (error) {
        console.error(error);
    }
}
exports.createOrder = createOrder;
