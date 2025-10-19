import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/database.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middlewares (need to be in sequential order)
app.use(cors()); // Allow cross-origin requests
app.use(express.json());
app.use((req, res, next) => {
  console.log(
    `We just got a new request!\nRequest method is ${req.method}\nRequest URL is ${req.url}`
  );
  next();
});
app.use(rateLimiter);

// Routes
app.use("/api/notes", notesRoutes);

// Connect to the database then start the app
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });
});
