import Department from "../models/Department.js";

// Function to retrieve all departments
const getDepartments = async (req, res) => {
    try {
        // Fetch all departments from the database
        const departments = await Department.find();
        // Return the list of departments with a success response
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ success: false, error: "get department server error" });
    }
};

// Function to add a new department
const addDepartment = async (req, res) => {
    try {
        // Log the request body for debugging
        console.log("Request Body:", req.body);
        // Destructure department name and description from the request body
        const { dep_name, description } = req.body;

        // Create a new Department object
        const newDep = new Department({
            dep_name,
            description
        });

        // Save the new department to the database
        await newDep.save();

        // Return the newly created department with a success response
        return res.status(200).json({ success: true, department: newDep });
    } catch (error) {
        // Log and handle errors
        console.error("Error in addDepartment:", error);
        return res.status(500).json({ success: false, error: "add department server error" });
    }
};

// Function to retrieve a specific department by its ID
const getDepartment = async (req, res) => {
    try {
        // Extract the department ID from the request parameters
        const { id } = req.params;

        // Fetch the department by its ID
        const department = await Department.findById({ _id: id });

        // Return the department details with a success response
        return res.status(200).json({ success: true, department });
    } catch (error) {
        // Handle server errors
        return res.status(500).json({ success: false, error: "get department server error" });
    }
};

// Function to update a department
const updateDepartment = async (req, res) => {
    try {
        // Extract the department ID from the request parameters
        const { id } = req.params;
        // Destructure updated department name and description from the request body
        const { dep_name, description } = req.body;

        // Find the department by ID and update its fields
        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { dep_name, description },
            { new: true } // Return the updated document after modification
        );

        // If the department is not found, return a 404 error
        if (!updatedDepartment) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        // Return the updated department with a success response
        return res.status(200).json({ success: true, department: updatedDepartment });
    } catch (error) {
        // Log and handle errors
        console.error("Error in updateDepartment:", error);
        return res.status(500).json({ success: false, error: "edit department server error" });
    }
};

// Function to delete a department
const deleteDepartment = async (req, res) => {
    try {
        // Extract the department ID from the request parameters
        const { id } = req.params;

        // Find the department by ID
        const deletedep = await Department.findById({ _id: id });

        // If the department is not found, return a 404 error
        if (!deletedep) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        // Delete the department from the database
        await deletedep.deleteOne();

        // Return the deleted department details with a success response
        return res.status(200).json({ success: true, deletedep });
    } catch (error) {
        // Log and handle errors
        console.error("Error in deleteDepartment:", error);
        return res.status(500).json({ success: false, error: "delete department server error" });
    }
};

// Export all department-related functions for use in other modules
export { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment };
