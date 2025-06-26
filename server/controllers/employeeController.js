import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import Idea from "../models/Idea.js"; 
import Department from "../models/Department.js";

// Function to add an employee (admin functionality)
const addEmployee = async (req, res) => {
  try {
    // Extracting fields from the request body
    const {
      name,
      email,
      employeeId,
      // dob, // Uncomment if needed
      // gender, // Uncomment if needed
      // maritalStatus, // Uncomment if needed
      designation,
      department,
      password,
      role = 'employee', // Default role set to 'employee'
    } = req.body;

    console.log(req.body); // Debugging the request body

    // Validate password
    if (!password || password.trim() === "") {
      return res.status(400).json({ success: false, error: "Password is required" });
    }

    // Check if user already exists with the provided email
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, error: "User already registered" });
    }

    // Hash the password for security
    const hashPassword = await bcrypt.hash(password, 10);

    // Create a new user record
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      isActive: true, // Mark the user as active
    });
    
    const savedUser = await newUser.save();

    // Create a corresponding employee record
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      // dob, // Uncomment if needed
      // gender, // Uncomment if needed
      // maritalStatus, // Uncomment if needed
      designation,
      department,
    });

    await newEmployee.save();
    return res.status(200).json({ success: true, message: "Employee created" });
  } catch (error) {
    console.log(error.message); // Log error for debugging
    return res.status(500).json({ success: false, error: "Server error in adding employee" });
  }
};

// Function to fetch all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 }) // Populate user details excluding the password
      .populate("department"); // Populate department details

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error fetching employees" });
  }
};

// Function to fetch a specific employee by ID or userId
const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    // Try finding the employee by their ID
    let employee = await Employee.findById(id)
      .populate("userId", { password: 0 })
      .populate("department");

    // If not found, try finding by userId
    if (!employee) {
      employee = await Employee.findOne({ userId: id })
        .populate("userId", { password: 0 })
        .populate("department");
    }

    // If still not found, return error
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    return res.status(200).json({ success: true, employee });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error fetching employee" });
  }
};

// Function to update an existing employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, maritalStatus, designation, department } = req.body;

    // Find the employee by ID
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Find the associated user by their ID
    const user = await User.findById(employee.userId);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Update the user details
    await User.findByIdAndUpdate(
      employee.userId,
      { name },
      { new: true }
    );

    // Update the employee details
    await Employee.findByIdAndUpdate(
      id,
      { /* maritalStatus, */ designation, department },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "Employee updated" });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Error updating employee" });
  }
};

// Function to delete an employee and their associated data
const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the employee and their user record
    const employee = await Employee.findById(id).populate('userId');
    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    // Delete all ideas associated with this employee
    await Idea.deleteMany({ employeeId: employee._id });

    // Delete the employee record
    await Employee.findByIdAndDelete(id);

    // Optionally delete the associated user record
    await User.findByIdAndDelete(employee.userId._id);

    return res.status(200).json({ success: true, message: "Employee and associated ideas deleted successfully." });
  } catch (error) {
    console.error("Error deleting employee:", error.message); // Log the error message
    return res.status(500).json({ success: false, error: "Error deleting employee" });
  }
};

export { addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee };
