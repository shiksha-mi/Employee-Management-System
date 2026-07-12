import jwt from "jsonwebtoken";
import User from "../models/User.js";

const verifyUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check if Authorization header exists
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        error: "Authorization header missing",
      });
    }

    // Get token from "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        error: "Token Not Provided",
      });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User Not Found",
      });
    }

    req.user = user;
    next();

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      error: "Invalid Token",
    });
  }
};

export default verifyUser;