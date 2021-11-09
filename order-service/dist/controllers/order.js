"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
var order_1 = __importDefault(require("../model/order"));
var connection;
var channel;
function createOrder(products, user) {
    var total = 0;
    if (!products) {
        console.log('no product available');
    }
    try {
        total = products.price;
        var newOrder = new order_1.default({
            products: products,
            customerId: user.id,
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
