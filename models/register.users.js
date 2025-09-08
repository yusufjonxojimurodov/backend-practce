import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }, // 🔹 qo‘shildi
    role: {
      type: String,
      enum: ["customer", "seller", "admin"],
      default: "customer",
    },
    image: { type: String, default: "" }, // 🔹 optional avatar
    bio: { type: String, default: "" },   // 🔹 optional bio
  },
  { timestamps: true } // 🔹 createdAt, updatedAt avtomatik ishlaydi
);

const User = mongoose.model("User", userSchema);
export default User;
