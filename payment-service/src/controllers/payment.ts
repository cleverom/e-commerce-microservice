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

export function paymentOrder(paymentDetails: Record<string, any>) {
    if (!paymentDetails) {
        console.log('no product available')
    }
    try {

        const newPaymentOrder = new paymentSchema({
            customerId: paymentDetails.newOrder.customerId,
            orderId: paymentDetails.newOrder._id,
            total_price: paymentDetails.newOrder.total_price,
        });
        newPaymentOrder.save();
        return newPaymentOrder;
    } catch (error) {
        console.error(error);
    }
}



export async function makePayment(req: Request, res: Response | any) {
    let paymentDetails;
    try {

        channel.consume("PAYMENT", (data: any) => {
            paymentDetails = JSON.parse(data.content);
            channel.ack(data)
            paymentOrder(paymentDetails)
            if (paymentDetails) {

                channel.sendToQueue(
                    "TRANSACTIONS",
                    Buffer.from(JSON.stringify({ paymentDetails }))
                );
                return res.send(paymentDetails).status(201);
            }else{
                console.log('No payment details')
              }


        });

    } catch (error) {
        console.error(error)
    }
}



