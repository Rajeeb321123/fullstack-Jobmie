// Routes for Reviews

import express from "express";
import { createReview, getReviews, deleteReview } from "../controllers/review.controller.js";
import {verifyToken} from '../middleware/jwt.js';

const router = express.Router();



// MAKING THE ENDPOINTS
router.post('/', verifyToken,createReview );

// id is gig id
router.get('/:gigId',getReviews );

// id is reveiw id
router.delete("/:id", deleteReview)

export default router;