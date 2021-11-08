import amqp from "amqplib";
import { Request, Response } from 'express'
import orderSchema from '../model/order'

let connection: any;
let channel: any;


export function createOrder(products: Record<string, any>[], userEmail: Record<string, unknown>[]) {
    let total = 0;
    try{

        for (let t = 0; t < products.length; ++t) {
            total += products[t].price;
        }
        const newOrder = new orderSchema({
            products,
            user: userEmail,
            total_price: total,
        });
        newOrder.save();
        return newOrder;
    }catch(error){
        console.error(error);
    }
}




