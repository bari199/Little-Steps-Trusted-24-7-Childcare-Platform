import express from "express";

import {
  createBooking,
  getMyBookings,
} from "../controllers/bookingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware("parent"), createBooking);

router.get(
  "/my-bookings",
  authMiddleware,
  roleMiddleware("parent"),
  getMyBookings,
);

export default router;
