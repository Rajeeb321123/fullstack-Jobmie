// Routes for gig

import express from "express";
import { createGig, deleteGig, get9Gigs, getGig, getGigs } from "../controllers/gig.controller.js";
import { verifyToken } from "../middleware/jwt.js";


const router = express.Router();



// MAKING THE ENDPOINTS
router.post('/', verifyToken, createGig);
router.delete('/:id', verifyToken, deleteGig);
router.get('/single/:id', getGig);
router.get('/', getGigs);
router.get('/get9gigs',get9Gigs)

export default router;