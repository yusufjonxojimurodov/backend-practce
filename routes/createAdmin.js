// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

import User from "./models/register.users.js"; // <-- pathni to'g'ri ekanini tekshiring

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/your-db-name";

async function createOrUpdateAdmin() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ✅");

    // 🔹 Admin emailni bu yerda yozasiz
    const email = "admin@gmail.com";

    // 🔹 Faqat admin1 bilan boshlansa bo'ladi
    if (!email.startsWith("admin1")) {
      throw new Error("❌ Admin yaratish uchun email 'admin1' bilan boshlanishi kerak!");
    }

   
    const plainPassword = crypto.randomBytes(6).toString("hex");

    const hashed = await bcrypt.hash(plainPassword, 10);

    let user = await User.findOne({ email });

    if (user) {
      user.role = "admin";
      user.password = hashed;
      await user.save();
      console.log(`⚡ Existing user topildi. Admin huquqi berildi: ${email}`);
      console.log(`🔑 Yangi parol: ${plainPassword}`);
    } else {
      const newUser = new User({
        firstName: "Admin",
        lastName: "",
        email,
        phone: "0000000000",
        password: hashed,
        role: "admin",
        image: "",
        bio: "Administrator account",
      });
      await newUser.save();
      console.log(`✅ Yangi admin yaratildi: ${email}`);
      console.log(`🔑 Admin parol: ${plainPassword}`);
    }
  } catch (err) {
    console.error("Error:", err.message || err);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected 🔌");
    process.exit(0);
  }
}

createOrUpdateAdmin();
