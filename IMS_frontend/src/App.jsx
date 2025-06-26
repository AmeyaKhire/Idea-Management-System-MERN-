// Import necessary components and hooks from 'react-router-dom' and other files
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes"; // Protects routes based on authentication
import RoleBaseRoutes from "./utils/RoleBaseRoutes"; // Protects routes based on user roles
import AdminSummary from "./components/dashboard/AdminSummary";
import DepartmentList from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import List from "./components/employee/List";
import Add from "./components/employee/Add";
import View from "./components/employee/View";
import Edit from "./components/employee/Edit";
import Summary from './components/EmployeeDashboard/Summary';
import IdeaList from './components/idea/List';
import AddIdea from './components/idea/Add';
import Setting from "./components/EmployeeDashboard/Setting";
import Table from "./components/idea/Table";
import Detail from "./components/idea/Detail";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter> {/* Wrapper for routing functionality */}
      <Routes> {/* Container for defining routes */}
        
        {/* Redirect the root path to /admin-dashboard */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />
        
        {/* Routes for login, signup, and reset password */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Dashboard route with role-based and authentication-based protection */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes> {/* Protects route if not authenticated */}
              <RoleBaseRoutes requiredRole={["admin"]}> {/* Restrict access to admin role */}
                <AdminDashboard /> {/* Admin dashboard component */}
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested routes inside admin-dashboard */}
          <Route index element={<AdminSummary />} /> {/* Default route for admin-summary */}
          <Route path="departments" element={<DepartmentList />} /> {/* Departments list */}
          <Route path="add-department" element={<AddDepartment />} /> {/* Add department */}
          <Route path="department/:id" element={<EditDepartment />} /> {/* Edit department by ID */}
          <Route path="employees" element={<List />} /> {/* Employees list */}
          <Route path="add-employee" element={<Add />} /> {/* Add new employee */}
          <Route path="employees/:id" element={<View />} /> {/* View employee details */}
          <Route path="employees/edit/:id" element={<Edit />} /> {/* Edit employee details */}
          <Route path="ideas" element={<Table />} /> {/* Ideas table */}
          
          {/* Additional routes for ideas */}
          <Route path="/admin-dashboard/ideas" element={<Table />} />
          <Route path="/admin-dashboard/ideas/:id" element={<Detail />} /> {/* Idea details */}
          <Route path="/admin-dashboard/employees/ideas/:id" element={<IdeaList />} /> {/* List of ideas for a specific employee */}
          
          <Route path="/admin-dashboard/setting" element={<Setting />} /> {/* Admin settings */}
        </Route>

        {/* Employee Dashboard route with role-based and authentication-based protection */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes> {/* Protects route if not authenticated */}
              <RoleBaseRoutes requiredRole={["admin", "employee"]}> {/* Restrict access to admin and employee roles */}
                <EmployeeDashboard /> {/* Employee dashboard component */}
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested routes inside employee-dashboard */}
          <Route index element={<Summary />} /> {/* Default route for employee-summary */}
          <Route path="/employee-dashboard/profile/:id" element={<View />} /> {/* View employee profile */}
          <Route path="/employee-dashboard/ideas/:id" element={<IdeaList />} /> {/* View ideas of the employee */}
          <Route path="/employee-dashboard/add-idea" element={<AddIdea />} /> {/* Add new idea */}
          <Route path="/employee-dashboard/setting" element={<Setting />} /> {/* Employee settings */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; // Export the App component to be used elsewhere in the application
