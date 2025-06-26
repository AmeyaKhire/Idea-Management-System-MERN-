import mongoose from "mongoose"; // Importing mongoose to interact with MongoDB
import { Schema } from "mongoose"; // Importing the Schema class from mongoose to define schemas

// Define the schema for an employee
const employeeSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, // Reference to the User model, which links an employee to a user
        ref: "User", // Specifies that this field references the User model
        required: true // Ensures that every employee must have a linked user
    },
    employeeId: { 
        type: String, // Employee's unique ID (typically provided by the organization)
        required: true, // This field is mandatory for every employee
        unique: true // Ensures no two employees can have the same employee ID
    },
    dob: { type: Date }, // Date of birth of the employee, optional
    gender: { type: String }, // Gender of the employee, optional
    maritalStatus: { type: String }, // Marital status of the employee, optional
    designation: { type: String }, // The job title or designation of the employee, optional
    department: { 
        type: Schema.Types.ObjectId, // Reference to the Department model, indicating the department the employee belongs to
        ref: "Department", // Specifies that this field references the Department model
        required: true // Ensures that every employee must belong to a department
    },
    createdAt: { 
        type: Date, 
        default: Date.now // Timestamp for when the employee record is created
    },
    updatedAt: { 
        type: Date, 
        default: Date.now // Timestamp for when the employee record was last updated
    }
});

// Create the Employee model using the defined schema
const Employee = mongoose.model("Employee", employeeSchema);

// Export the Employee model for use in other parts of the application
export default Employee;
