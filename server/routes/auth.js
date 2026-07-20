import express from "express";
import upload from "../middleware/upload.js";
import {
  login,
  verify,
  updateProfile,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);

router.get("/verify", authMiddleware, verify);

router.put(
  "/update-profile",
  authMiddleware,
  upload.single("profileImage"),
  updateProfile
);
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

router.post("/forgot-password", forgotPassword);

router.post("/verify-otp", verifyOTP);

router.post("/reset-password", resetPassword);

export default router;