import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import centerRoutes from "./routes/centerRoutes.js";

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/centers", centerRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Little Steps Backend Running",
  });
});

export default app;
