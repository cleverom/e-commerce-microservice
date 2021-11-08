import amqp from "amqplib";
import paymentSchema from '../models/payment'


let connection: any;
let channel: any;

export async function connect() {
    const amqpServer = "amqp://localhost:5672";
    connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue("PAYMENT");
}

export async function makePayment(req: Request, res: Response | any) {
    let paymentDetails;
    try {
        channel.consume("PAYMENT", (data: any) => {
            // let datas = Buffer.from(JSON.stringify(data.content))
            // console.log(data)
            paymentDetails = JSON.parse(data.content);
            console.log(paymentDetails)
            channel.ack(data)
            
            // console.log(JSON.parse(datas.toString()))
            // console.log(datas)


        });
        
         return res.send(paymentDetails).status(201);

    } catch (error) {
        console.error(error)
    }


}

