import jwt from 'jsonwebtoken'; // Importing JSON Web Token for authentication and authorization
import User from '../models/User.js'; // Importing the User model for database interaction
import bcrypt from 'bcrypt'; // Importing bcrypt for password hashing and comparison
import nodemailer from 'nodemailer'; // Importing nodemailer for sending emails

// Login function to authenticate users
const login = async (req, res) => {
    try {
        const { email, password } = req.body; // Extracting email and password from the request body

        const user = await User.findOne({ email }); // Finding the user by email
        if (!user) {
            // If user is not found, return a 404 status with an error message
            return res.status(404).json({ success: false, error: "User Not Found" });
        }

        const isMatch = await bcrypt.compare(password, user.password); // Comparing input password with stored hashed password
        if (!isMatch) {
            // If password does not match, return a 404 status with an error message
            return res.status(404).json({ success: false, error: "Wrong Password" });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign(
            { _id: user._id, role: user.role }, // Payload contains user ID and role
            process.env.JWT_KEY, // Secret key for signing the token
            { expiresIn: "10d" } // Token expiration time
        );

        // Send the token and user details in the response
        res.status(200).json({
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role },
        });

    } catch (error) {
        // Catch any server errors and return a 500 status
        res.status(500).json({ success: false, error: error.message });
    }
};

// Function to verify the user authentication
const verify = (req, res) => {
    return res.status(200).json({ success: true, user: req.user }); // Return user information if authenticated
};

// Function to handle forgot password requests
const forgotPassword = async (req, res) => {
    const { email } = req.body; // Extracting email from the request body

    try {
        const user = await User.findOne({ email }); // Find the user by email
        if (!user) {
            // If user is not found, return a 404 status with an error message
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Generate a password reset token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, { expiresIn: '1h' });

        // Configure nodemailer transporter for sending emails
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Email service
            auth: {
                user: process.env.EMAIL_USER, // Sender email
                pass: process.env.EMAIL_PASS, // Sender email password
            },
        });

        // Email options including the reset link
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Request',
            html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                   <a href="http://localhost:5173/reset-password/${token}">Reset Password</a>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Respond with success message
        res.status(200).json({ success: true, message: "Password reset link sent to your email." });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, error: "Server error" }); // Return a 500 status for server errors
    }
};

// Function to reset the password using the token
const resetPassword = async (req, res) => {
    const { password } = req.body; // Extract new password from the request body
    const token = req.params.token; // Extract the reset token from request parameters

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY); // Verify the token

        const user = await User.findById(decoded._id); // Find user by decoded ID from token
        if (!user) {
            // If user is not found, return a 404 status with an error message
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Hash the new password
        user.password = await bcrypt.hash(password, 10);
        await user.save(); // Save the updated user record

        // Respond with success message
        res.status(200).json({ success: true, message: "Password has been reset successfully." });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ success: false, error: "Server error" }); // Return a 500 status for server errors
    }
};

// Export the functions for use in other parts of the application
export { login, verify, forgotPassword, resetPassword };
