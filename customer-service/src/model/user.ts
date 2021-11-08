import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});

export default mongoose.model("user", UserSchema);