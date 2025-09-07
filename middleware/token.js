import jwt from "jsonwebtoken";
import User from "../models/register.users.js";

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "Foydalanuvchi topilmadi ❌" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: "Token yaroqsiz ❌" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Token topilmadi ❌" });
  }
};
