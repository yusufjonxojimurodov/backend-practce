import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// MongoDB ga ulanish
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB ulandi ✅"))
  .catch(err => console.error("MongoDB xato ❌:", err));

// Routes
app.use("/api/auth", authRoutes);   // register/login
app.use("/api/user", userRoutes);   // /me va /update/:id

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti 🚀`));
