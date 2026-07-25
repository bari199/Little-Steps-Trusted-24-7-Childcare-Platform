import express from "express";

import {
  createOrder,
  verifyPayment,
  getMyPayments,
  getPaymentDetails,
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

router.get(
  "/my-payments",

  authMiddleware,

  roleMiddleware("parent"),

  getMyPayments,
);

router.get(
  "/:id",

  authMiddleware,

  roleMiddleware("parent"),

  getPaymentDetails,
);

export default router;
