import express from 'express';
import {createProduct} from '../controllers/product'
const router = express.Router();



/* GET home page. */
router.post('/product', createProduct)

export default router;
