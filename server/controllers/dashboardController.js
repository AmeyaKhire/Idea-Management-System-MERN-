import Department from "../models/Department.js";
import Employee from "../models/Employee.js";
import Idea from "../models/Idea.js";
import mongoose from "mongoose";

// Function to get a summary of employees, departments, and ideas
const getSummary = async (req, res) => {
    try {
        // Count the total number of employees
        const totalEmployees = await Employee.countDocuments();

        // Count the total number of departments
        const totalDepartments = await Department.countDocuments();

        // Count the total number of ideas submitted
        const totalIdeasApplied = await Idea.countDocuments();

        // Get the distinct employee IDs who have submitted ideas
        const uniqueEmployeesApplied = await Idea.distinct('employeeId');

        // Aggregate ideas by their status (Approved, Rejected, Pending, etc.)
        const ideaStatus = await Idea.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        // Create a summary of idea statuses
        const ideaSummary = {
            appliedFor: uniqueEmployeesApplied.length, // Total distinct employees who applied for ideas
            totalIdeas: totalIdeasApplied, // Total number of ideas submitted
            approved: ideaStatus.find(item => item._id === "Approved")?.count || 0, // Count of approved ideas
            rejected: ideaStatus.find(item => item._id === "Rejected")?.count || 0, // Count of rejected ideas
            pending: ideaStatus.find(item => item._id === "Pending")?.count || 0, // Count of pending ideas
        };

        // Return the summary data
        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            ideaSummary
        });
    } catch (error) {
        // Log and return an error response in case of failure
        console.log(error.message);
        return res.status(500).json({ success: false, error: "dashboard summary error" });
    }
};

// Function to get a summary of ideas for a specific employee
const getEmployeeIdeaSummary = async (req, res) => {
    const { employeeId } = req.params; // Extract employee ID from request parameters

    try {
        // Convert the employee ID to a MongoDB ObjectId
        const employeeObjectId = new mongoose.Types.ObjectId(employeeId);

        // Log the employee ID being used for debugging
        console.log("Fetching ideas for employee ID:", employeeId);

        // Fetch all ideas submitted by the specified employee
        const ideas = await Idea.find({ employeeId: employeeObjectId }).lean();
        console.log("Ideas found for employee:", ideas);

        // Aggregate the ideas submitted by the employee based on their status
        const ideaStatus = await Idea.aggregate([
            { $match: { employeeId: employeeObjectId } }, // Filter for the specific employee
            { $group: { _id: "$status", count: { $sum: 1 } } } // Group by status and count each status
        ]);
        
        // Log the aggregation result for debugging
        console.log("Idea status aggregation result:", ideaStatus);

        // Create a summary of the employee's idea statuses
        const ideaSummary = {
            appliedFor: ideas.length, // Total ideas submitted by the employee
            approved: ideaStatus.find(item => item._id === "Approved")?.count || 0, // Count of approved ideas
            rejected: ideaStatus.find(item => item._id === "Rejected")?.count || 0, // Count of rejected ideas
            pending: ideaStatus.find(item => item._id === "Pending")?.count || 0, // Count of pending ideas
        };

        // Return the summary data
        res.status(200).json({
            success: true,
            ideaSummary
        });
    } catch (error) {
        // Log and return an error response in case of failure
        console.error("Error in getEmployeeIdeaSummary:", error);
        res.status(500).json({ success: false, error: "employee idea summary error" });
    }
};

// Export the functions for use in other modules
export { getSummary, getEmployeeIdeaSummary };
