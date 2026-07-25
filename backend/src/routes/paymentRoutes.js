import express from "express";

import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/create-order",
  authMiddleware,
  roleMiddleware("parent"),
  createOrder,
);

router.post("/verify", authMiddleware, roleMiddleware("parent"), verifyPayment);

export default router;
