// Routes for messages

import express from "express";
import {
  createMessage,
  getMessages,
} from "../controllers/message.controller.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.post("/", verifyToken, createMessage);
// getting all message of conversation
router.get("/:id", verifyToken, getMessages);

export default router;