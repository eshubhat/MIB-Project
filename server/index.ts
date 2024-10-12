import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/UserRoutes";
import formRoutes from "./routes/FormRoutes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
// Connect to the database
connectDB();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/form", formRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
