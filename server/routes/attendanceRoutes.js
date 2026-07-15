import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  markAttendance,
  getAttendance,
  getMyAttendance,
} from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", authMiddleware, markAttendance);

router.get("/", authMiddleware, getAttendance);

router.get("/my-attendance", authMiddleware, getMyAttendance);

export default router;