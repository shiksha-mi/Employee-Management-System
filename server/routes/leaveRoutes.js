import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addLeave,
  getLeaves,
  getLeave,
  updateLeaveStatus,
} from "../controllers/leaveController.js";

const router = express.Router();

router.get("/", authMiddleware, getLeaves);

router.get("/:id", authMiddleware, getLeave);

router.post("/add", authMiddleware, addLeave);

router.put("/:id", authMiddleware, updateLeaveStatus);

export default router;