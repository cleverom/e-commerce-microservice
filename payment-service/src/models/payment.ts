import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
    customerId: String,
    orderId: String,
    amount: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});


export default mongoose.model("payment", PaymentSchema);