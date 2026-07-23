import express from "express";

import {
  createCenter,
  getCenters,
  getSingleCenter,
  updateCenter,
  deleteCenter,
} from "../controllers/centerController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();

/* Public */
router.get("/", getCenters);
router.get("/slug/:slug", getSingleCenter);

/* Provider */
router.post("/", authMiddleware, roleMiddleware("provider"), createCenter);

router.put("/:id", authMiddleware, roleMiddleware("provider"), updateCenter);

/* Admin */
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteCenter);

export default router;
