// Routes for User

import express from "express";
import {  deleteUser, getUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();



// MAKING THE ENDPOINTS
// verifyToken is middleware, if token is incorrect deleteUser willnot occur
router.delete('/:id', verifyToken, deleteUser );
router.get("/:id",verifyToken,getUser);

export default router;