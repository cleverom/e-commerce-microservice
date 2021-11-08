"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var payment_1 = require("../controllers/payment");
var router = express_1.default.Router();
/* GET home page. */
router.post('/payment', payment_1.makePayment);
exports.default = router;
