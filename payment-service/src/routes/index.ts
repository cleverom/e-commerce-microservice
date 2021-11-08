import express from 'express';
import { makePayment } from '../controllers/payment';
const router = express.Router();

/* GET home page. */
router.post('/payment', makePayment)

export default router;
