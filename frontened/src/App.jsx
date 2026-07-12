import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";

import Profile from "./components/employee/Profile";
import MyLeaves from "./components/employee/MyLeaves";

import AdminSummary from "./components/dashboard/AdminSummary";
import EmployeeSummary from "./components/dashboard/EmployeeSummary";


// Department
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";

// Employee
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";

// Leave
import LeaveList from "./components/leave/LeaveList";
import AddLeave from "./components/leave/AddLeave";
import ViewLeave from "./components/leave/ViewLeave";

// Salary
import SalaryList from "./components/salary/SalaryList";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import EditSalary from "./components/salary/EditSalary";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Dashboard */}
          <Route index element={<AdminSummary />} />

          {/* Department Routes */}
          <Route path="departments" element={<DepartmentList />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="departments/:id" element={<EditDepartment />} />

          {/* Employee Routes */}
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-employee" element={<AddEmployee />} />
          <Route path="employees/:id" element={<EditEmployee />} />
          <Route path="employees/view/:id" element={<ViewEmployee />} />

          {/* Leave Routes */}
          <Route path="leaves" element={<LeaveList />} />
          <Route path="add-leave" element={<AddLeave />} />
          <Route path="leaves/:id" element={<ViewLeave />} />

          {/* Salary Routes */}
          <Route path="salary" element={<SalaryList />} />
          <Route path="add-salary" element={<AddSalary />} />
          <Route path="salary/:id" element={<ViewSalary />} />
          <Route path="salary/edit/:id" element={<EditSalary />} />

        </Route>

       {/* Employee Dashboard */}
<Route
  path="/employee-dashboard"
  element={
    <PrivateRoutes>
      <RoleBaseRoutes requiredRole={["employee"]}>
        <EmployeeDashboard />
      </RoleBaseRoutes>
    </PrivateRoutes>
  }
>
  <Route index element={<EmployeeSummary />} />
  <Route path="profile" element={<Profile />} />
  <Route path="my-leaves" element={<MyLeaves />} />
</Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;