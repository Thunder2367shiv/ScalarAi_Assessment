import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config();

connectDB().catch(err => {
    console.error("Initial DB Connection Failed:", err);
});

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running locally on port ${PORT}`);
  });
}

export default app;