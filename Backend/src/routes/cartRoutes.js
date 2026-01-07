import express from 'express';
import { getCart, updateCart } from '../controllers/CartController.js';

const router = express.Router();

router.route('/').get(getCart).post(updateCart);

export default router;