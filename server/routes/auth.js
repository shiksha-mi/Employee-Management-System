import express from "express";
import upload from "../middleware/upload.js";
import {
  login,
  verify,
  updateProfile,
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

export default router;