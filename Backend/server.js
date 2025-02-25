import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRoutes from './routes/userRoutes.js';  // Ensure this import is present

dotenv.config();

const app = express();  // Make sure this is declared first

app.use(
  cors({
    origin: "http://localhost:3000", // React app's URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow credentials
  })
);

// Add middleware after initializing the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", userRoutes); // Now it's safe to use app

// Test route
app.get("/", (req, res) => {
  res.send("Server is ready");
});

// Connect to DB and start the server
app.listen(5000, () => {
  connectDB();
  console.log("Server started at port 5000");
});
