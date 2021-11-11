import express from 'express';
import {createProduct} from '../controllers/product'
import {buyProduct} from '../controllers/product'
const router = express.Router();



/* GET home page. */
router.post('/product', createProduct)
router.post('/product/buy', buyProduct)

export default router;

