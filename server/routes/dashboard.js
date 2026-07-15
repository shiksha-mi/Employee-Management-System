import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getSummary,
  getChartData,
} from "../controllers/dashboardController.js";

const router = express.Router();

// Dashboard Summary
router.get("/summary", authMiddleware, getSummary);

// Dashboard Charts
router.get("/charts", authMiddleware, getChartData);

export default router;