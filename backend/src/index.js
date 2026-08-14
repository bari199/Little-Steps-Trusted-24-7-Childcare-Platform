import dotenv from "dotenv";

const result = dotenv.config();

console.log(result);
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 8000;

connectDB();
console.log("BACKEND FILE PATH:", import.meta.url);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
