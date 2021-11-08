import { Request, Response } from 'express'
import commentObject from '../utils/product'
import productSchema from '../model/product'


export async function createProduct(req: Request, res: Response) {
    const { name, description, price } = req.body;
    const { error, value } = commentObject.validate({ name, description, price })
    if (error?.details) throw error;
    const newProduct = new productSchema(
        value
    );
    newProduct.save().then()
        .catch((error) => {
            throw error;
        });;
    return res.json(newProduct).sendStatus(201);

}