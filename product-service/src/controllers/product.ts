import amqp from "amqplib";
import { Request, Response } from 'express'
import commentObject from '../utils/product'
import productSchema from '../model/product'

let connection: any;
let channel: any;

export async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PRODUCT");
}

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
    return res.json("product creaed successfully").status(201);

}

export async function buyProduct(req: Request | any, res: Response) {
    let order;

    const { ids } = req.body;
    // console.log(ids)
    try {
        const products = await productSchema.findOne({ _id: { $in: ids } });

        channel.sendToQueue(
            "ORDER",
            Buffer.from(
                JSON.stringify({
                    products,
                    user: req.user,
                })
            )
        );
        channel.consume("PRODUCT", (data: any) => {

            order = JSON.parse(data.content);
            channel.ack(data)

            return res.send(order).status(201);
        });


    } catch (error) {
        console.error(error)
    }


}
