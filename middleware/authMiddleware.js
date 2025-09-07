import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(401).json({ message: "Token yo‘q ❌" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // req.user.id va req.user.role mavjud
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token noto‘g‘ri ❌" });
  }
};
