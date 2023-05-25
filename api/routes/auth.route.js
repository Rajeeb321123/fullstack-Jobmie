// Routes for Auth

import express from "express";
import { register,login, logout } from "../controllers/auth.controller.js";

const router = express.Router();



// MAKING THE ENDPOINTS
router.post('/register', register )
router.post('/login', login );
router.post('/logout', logout );

export default router;