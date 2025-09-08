// backend/routes/user.js
import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/register.users.js";
import { protect } from "../middleware/token.js";
import { upload } from "../middleware/upload.js"; // multer fayl upload

const router = express.Router();

// GET current user
router.get("/me", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi ❌" });

    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,          // ✅ qo‘shildi
        role: user.role,
        image: user.image,
        bio: user.bio,
        createdAt: user.createdAt,  // ✅ qo‘shildi
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi ❌", error: error.message });
  }
});

// PUT update user
router.put("/update/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, bio } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi ❌" });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phone) user.phone = phone;  // ✅ yangilash imkoni
    if (bio) user.bio = bio;        // ✅ yangilash imkoni
    if (password) user.password = await bcrypt.hash(password, 10);
    if (req.file) user.image = req.file.filename;

    await user.save();

    res.status(200).json({
      message: "Profil muvaffaqiyatli yangilandi ✅",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role,
        image: user.image,
        bio: user.bio,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi ❌", error: error.message });
  }
});

export default router;
