import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";

import upload from "../middleware/multer.js";

const router = express.Router();

router.get("/", authMiddleware, getEmployees);

router.get("/:id", authMiddleware, getEmployee);

router.put("/:id", authMiddleware, updateEmployee);

router.delete("/:id", authMiddleware, deleteEmployee);

router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  addEmployee
);

export default router;