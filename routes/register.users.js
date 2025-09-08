router.post("/register/user", async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring ❌" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email allaqachon mavjud ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,                // 🔹 qo‘shildi
      password: hashedPassword,
      role: "customer",
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Foydalanuvchi ro‘yxatdan o‘tdi ✅",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        phone: newUser.phone,        // 🔹 endi qaytadi
        role: newUser.role,
        createdAt: newUser.createdAt // 🔹 endi qaytadi
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server xatosi ❌", error: error.message });
  }
});
