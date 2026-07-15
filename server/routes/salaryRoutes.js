import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addSalary,
  getSalaries,
  getSalary,
  updateSalary,
  deleteSalary,
  getMySalary,
  downloadSalarySlip,
} from "../controllers/salaryController.js";

const router = express.Router();


router.post("/add", authMiddleware, addSalary);

router.get("/", authMiddleware, getSalaries);



router.get("/my-salary", authMiddleware, getMySalary);

router.get(
  "/download/:id",
  authMiddleware,
  downloadSalarySlip
);


router.get("/:id", authMiddleware, getSalary);

router.put("/:id", authMiddleware, updateSalary);
router.delete("/:id", authMiddleware, deleteSalary);

export default router;