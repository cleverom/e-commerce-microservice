"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var product_1 = require("../controllers/product");
var router = express_1.default.Router();
/* GET home page. */
router.post('/product', product_1.createProduct);
exports.default = router;
