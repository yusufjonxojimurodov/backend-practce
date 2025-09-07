import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/register.users.js";
import { protect } from "../middleware/token.js";
import { upload } from "../middleware/upload.js"; // yangi

const router = express.Router();

// Rasm bilan yoki rasm-siz update
router.put("/update/:id", protect, upload.single("image"), async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Foydalanuvchi topilmadi ❌" });

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
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
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi ❌", error: error.message });
  }
});

export default router;
