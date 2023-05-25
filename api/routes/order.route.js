// Routes for Orders
// most imp of this project: stripe payment 


import express from "express";
import { verifyToken } from '../middleware/jwt.js';
import { getOrders, createOrder, intent, confirm } from "../controllers/order.controller.js";



const router = express.Router();



// MAKING THE ENDPOINTS

// create order is just for test only ,real create order is intent or stripe funcion below
router.post('/:gigId', verifyToken, createOrder);

router.get('/',verifyToken, getOrders );

// IMP: most imp of this project , stripe create order and payment
router.post('/create-payment-intent/:gigId', verifyToken, intent);

router.put("/", verifyToken, confirm );

export default router;