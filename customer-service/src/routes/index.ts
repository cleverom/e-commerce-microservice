import express from 'express';
import {createUser} from '../controllers/user'
import {login} from '../controllers/user'
const router = express.Router();

/* GET home page. */
router.post('/user', createUser)
router.post('/user/login', login)

export default router;
