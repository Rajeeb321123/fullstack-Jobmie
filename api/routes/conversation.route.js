// Routes for message

import express from "express";
import { getConversations,createConversartion,getSingleConversation,updateConversation } from "../controllers/conversation.conroller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();



// MAKING THE ENDPOINTS
router.get('/', verifyToken, getConversations );
router.post('/', verifyToken, createConversartion );
router.get('/single/:id', verifyToken, getSingleConversation );
router.put('/:id', verifyToken, updateConversation );


export default router;