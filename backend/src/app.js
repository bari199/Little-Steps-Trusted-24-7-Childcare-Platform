import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import centerRoutes from "./routes/centerRoutes.js";
import caregiverRoutes from "./routes/caregiverRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

console.log("========== LITTLE STEPS BACKEND ==========");
console.log("Routes Loaded Successfully");

// ==============================
// CORS
// ==============================
app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  }),
);

// ==============================
// Body Parser
// ==============================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(cookieParser());

// ==============================
// Request Logger
// ==============================
app.use((req, res, next) => {
  console.log(`\n${req.method} ${req.originalUrl}`);
  next();
});

// ==============================
// API Routes
// ==============================
app.use("/api/auth", authRoutes);

app.use("/api/providers", providerRoutes);

app.use("/api/centers", centerRoutes);

app.use("/api/caregivers", caregiverRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/subscriptions", subscriptionRoutes);

app.use("/api/admin", adminRoutes);

// ==============================
// Health Check
// ==============================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Little Steps Backend Running 🚀",
  });
});

// ==============================
// 404 Handler
// ==============================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ==============================
// Global Error Handler
// ==============================
app.use((err, req, res, next) => {
  console.error("\n========== GLOBAL ERROR ==========");
  console.error("Name:", err.name);
  console.error("Message:", err.message);

  if (err.errors) {
    console.error("Validation Errors:");
    console.dir(err.errors, { depth: null });
  }

  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export default app;
