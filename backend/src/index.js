import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import connectDB from "./config/db.js";

let dbConnected = false;

const handler = async (req, res) => {
  try {
    if (!dbConnected) {
      await connectDB();
      dbConnected = true;
    }

    return app(req, res);
  } catch (error) {
    console.error("Vercel Backend Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export default handler;
