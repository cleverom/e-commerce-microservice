"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
function mongodbConnection() {
    var options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    };
    mongoose_1.default
        .connect(process.env.DATABASE_URL, options)
        .then(function () { return console.log('Connected to MongoDB'); })
        .catch(function (err) { return console.log(err.message); });
}
exports.default = mongodbConnection;
