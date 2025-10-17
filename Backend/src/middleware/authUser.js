import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";
import dotenv from "dotenv";
dotenv.config();

export const UserapplyPromo = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; //  Attach user to request
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token", error: err.message });
  }
};
