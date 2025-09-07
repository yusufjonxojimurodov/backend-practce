import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/register.users.js";
import user from "./routes/user.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB ulandi ✅"))
  .catch(err => console.error("MongoDB xato ❌:", err));


app.use("/api/auth", authRoutes);
app.use("/api/user", user)

app.listen(PORT, () => console.log(`Server ${PORT} portda ishlayapti 🚀`));