import { Request, Response } from 'express'
import orderSchema from '../model/order'


export function createOrder(products: Record<string, any>, user: Record<string, unknown>) {
    let total = 0;
    if(!products){
        console.log('no product available')
    }
    try{

        total = products.price
        const newOrder = new orderSchema({
            products,
            customerId: user.id,
            total_price: total,
        });
        newOrder.save();
        return newOrder;
    }catch(error){
        console.error(error);
    }
}




