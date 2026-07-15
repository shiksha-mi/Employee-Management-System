
import express from "express";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employeeRoutes.js";
import connectToDatabase from "./db/db.js";
import dashboardRouter from "./routes/dashboard.js";
import leaveRouter from "./routes/leaveRoutes.js";
import salaryRouter from "./routes/salaryRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

connectToDatabase();

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static(path.join("public", "uploads")));

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);

app.use("/api/dashboard", dashboardRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/attendance", attendanceRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});