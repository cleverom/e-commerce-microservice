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
    return res.json(newProduct).sendStatus(201);

}

export async function buyProduct(req: Request, res: Response | any) {
    let order;
    let finalOrder;
    const { ids } = req.body;
    console.log(ids)
    try {

        const products = await productSchema.find({ _id: { $in: ids } });
        console.log(req.user, products)
        channel.sendToQueue(
            "ORDER",
            Buffer.from(
                JSON.stringify({
                    products,
                    userEmail: req.user.email,
                })
            )
        );
        channel.consume("PRODUCT", (data: any) => {
            // let datas = Buffer.from(JSON.stringify(data.content))
            order = JSON.parse(data.content);
            console.log(order)
            channel.ack(data)
            finalOrder = JSON.stringify(order, null, 2)
            // console.log(JSON.parse(datas.toString()))
            // console.log(datas)


        });
         return res.send(finalOrder).status(201);

    } catch (error) {
        console.error(error)
    }


}
