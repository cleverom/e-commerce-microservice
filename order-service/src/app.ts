import createError, { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import { createOrder } from './controllers/order'
import amqp from "amqplib";
import mongodbConnection from './config/config';

let channel: amqp.Channel
let connection

dotenv.config();

mongodbConnection()

var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


async function connect() {
  const amqpServer = "amqp://localhost:5672";
  connection = await amqp.connect(amqpServer);
  channel = await connection.createChannel();
  await channel.assertQueue("ORDER");
}

connect().then(() => {
  channel.consume("ORDER", (data: any) => {
      const { products, user} = JSON.parse(data.content);
      const newOrder = createOrder(products, user);
      channel.ack(data);
      if(products){

        channel.sendToQueue(
            "PRODUCT",
            Buffer.from(JSON.stringify({ newOrder }))
        );
        channel.sendToQueue(
            "PAYMENT",
            Buffer.from(JSON.stringify({ newOrder }))
        );
      }else{
        console.log('No product available')
      }
  });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err: HttpError, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
