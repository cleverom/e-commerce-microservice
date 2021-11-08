import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    products: [
        {
            product_id: String,
        },
    ],
    user: String,
    total_price: Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("order", OrderSchema);