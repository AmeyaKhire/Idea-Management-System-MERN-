import mongoose from "mongoose"; // Importing Mongoose for MongoDB schema and model creation
import Employee from "./Employee.js"; // Importing the Employee model to manage related employee data
import Idea from "./Idea.js"; // Importing the Idea model to manage related idea data

// Define the schema for a department
const departmentSchema = new mongoose.Schema({
    dep_name: { type: String, required: true }, // Department name, required field
    description: { type: String }, // Optional description for the department
    createdAt: { type: Date, default: Date.now }, // Timestamp for when the department is created
    updatedAt: { type: Date, default: Date.now } // Timestamp for the last update to the department
});

// Middleware to execute before deleting a department
departmentSchema.pre(
    "deleteOne", // Triggered on the deleteOne operation
    { document: true, query: false }, // Specifies that this middleware applies to document deletion
    async function (next) {
        try {
            // Find all employees associated with the department being deleted
            const employees = await Employee.find({ department: this._id });

            // Extract employee IDs to handle related ideas
            const empIds = employees.map(emp => emp._id);

            // Delete all employees associated with the department
            await Employee.deleteMany({ department: this._id });

            // Delete all ideas associated with the employees in the department
            await Idea.deleteMany({ employeeId: { $in: empIds } });

            // Proceed to the next middleware or operation
            next();
        } catch (error) {
            // Pass any errors encountered to the next middleware
            next(error);
        }
    }
);

// Create and export the Department model
const Department = mongoose.model("Department", departmentSchema);
export default Department;
