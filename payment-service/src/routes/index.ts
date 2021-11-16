import express from 'express';
import { makePayment } from '../controllers/payment';
import {isUser} from '../isUser'
const router = express.Router();

/* GET home page. */
router.post('/payment', isUser, makePayment)

export default router;
