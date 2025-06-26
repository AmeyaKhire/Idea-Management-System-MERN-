import User from '../models/User.js';
import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt';

// Function to handle user signup
const signup = async (req, res) => {
    try {
        // Destructure required fields from the request body
        const {
            name,
            email,
            employeeId,
            // dob,             // Uncomment if you want to include date of birth
            // gender,          // Uncomment if you want to include gender
            // maritalStatus,   // Uncomment if you want to include marital status
            designation,
            department,
            password
        } = req.body;

        // Validate password length (minimum 8 characters)
        if (password.length < 8) {
            return res.status(400).json({ 
                success: false, 
                error: "Password must be at least 8 characters long." 
            });
        }

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                error: "User already exists" 
            });
        }

        // Hash the user's password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: 'employee', // Default role is 'employee'
            isActive: true    // Set to true if immediate access is allowed
        });

        // Save the new user record to the database
        const savedUser = await newUser.save();

        // Create a new employee record linked to the user
        const newEmployee = new Employee({
            userId: savedUser._id, // Link to the saved user's ID
            employeeId,
            // dob,             // Uncomment if you want to save date of birth
            // gender,          // Uncomment if you want to save gender
            // maritalStatus,   // Uncomment if you want to save marital status
            designation,
            department
        });

        // Save the new employee record to the database
        await newEmployee.save();

        // Respond with success message
        res.status(201).json({ 
            success: true, 
            message: "User registered successfully" 
        });
    } catch (error) {
        // Handle any errors and respond with error message
        res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// Export the signup function for use in other parts of the application
export { signup };
