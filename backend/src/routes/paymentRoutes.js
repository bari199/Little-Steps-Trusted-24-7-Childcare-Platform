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

console.log("========== PAYMENT ROUTER LOADED ==========");

// Global Router Logger
router.use((req, res, next) => {
  console.log("\n==================================");
  console.log("PAYMENT ROUTE HIT");
  console.log("Method :", req.method);
  console.log("URL    :", req.originalUrl);
  console.log("Body   :", req.body);
  console.log("Cookies:", req.cookies);
  console.log("==================================\n");
  next();
});

// Auth Logger
const authLogger = (req, res, next) => {
  console.log("----- AFTER AUTH -----");
  console.log("User:", req.user);
  console.log("----------------------");
  next();
};

// POST /create-order
router.post(
  "/create-order",

  (req, res, next) => {
    console.log("STEP 1 -> Route Matched");
    next();
  },

  authMiddleware,

  (req, res, next) => {
    console.log("STEP 2 -> Auth Passed");
    console.log("Logged User:", req.user);
    next();
  },

  roleMiddleware("parent"),

  (req, res, next) => {
    console.log("STEP 3 -> Role Passed");
    next();
  },

  authLogger,

  createOrder,
);

// VERIFY
router.post("/verify", authMiddleware, roleMiddleware("parent"), verifyPayment);

// MY PAYMENTS
router.get(
  "/my-payments",
  authMiddleware,
  roleMiddleware("parent"),
  getMyPayments,
);

// DETAILS
router.get("/:id", authMiddleware, roleMiddleware("parent"), getPaymentDetails);

export default router;
