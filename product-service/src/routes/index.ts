import express from 'express';
import {createProduct} from '../controllers/product'
import {buyProduct} from '../controllers/product'
import {isUser} from '../isUser'
const router = express.Router();



/* GET home page. */
router.post('/product', isUser, createProduct)
router.post('/product/buy', isUser, buyProduct)

export default router;

