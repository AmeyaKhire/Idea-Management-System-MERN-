import User from "../models/User.js";
import bcrypt from 'bcrypt';

// Function to handle password change requests
const changePassword = async (req, res) => {
    try {
        // Destructure userId, oldPassword, and newPassword from the request body
        const { userId, oldPassword, newPassword } = req.body;

        // Find the user by their ID
        const user = await User.findById({ _id: userId });
        if (!user) {
            // If user is not found, return a 404 response with an error message
            return res.status(404).json({ success: false, error: "user not found" });
        }

        // Compare the provided oldPassword with the stored hashed password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            // If the passwords do not match, return a 404 response with an error message
            return res.status(404).json({ success: false, error: "wrong old password" });
        }

        // Hash the new password with a salt round of 10
        const hashPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        const newUser = await User.findByIdAndUpdate({ _id: userId }, { password: hashPassword });

        // Return a success response
        return res.status(200).json({ success: true });

    } catch (error) {
        // Handle any errors and return a 500 response with an error message
        return res.status(500).json({ success: false, error: "setting error" });
    }
};

// Export the changePassword function for use in other modules
export { changePassword };
