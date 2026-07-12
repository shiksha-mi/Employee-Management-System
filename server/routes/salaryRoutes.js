import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addSalary,
  getSalaries,
  getSalary,
  updateSalary,
  deleteSalary,
} from "../controllers/salaryController.js";

const router = express.Router();


router.post("/add", authMiddleware, addSalary);

router.get("/", authMiddleware, getSalaries);


router.get("/:id", authMiddleware, getSalary);

router.put("/:id", authMiddleware, updateSalary);
router.delete("/:id", authMiddleware, deleteSalary);

export default router;