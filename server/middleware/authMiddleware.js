import jwt from 'jsonwebtoken'; // Import the JSON Web Token (JWT) library for token verification
import User from '../models/User.js'; // Import the User model to fetch user data from the database

// Middleware function to verify the user based on a JWT token
const verifyUser = async (req, res, next) => {
    try {
        // Extract the token from the 'Authorization' header (in the format "Bearer <token>")
        const token = req.headers.authorization.split(' ')[1];
        
        // Check if the token is not provided in the request
        if (!token) {
            return res.status(404).json({ success: false, error: "Token Not Provided" });
        }

        // Verify the token using the secret key defined in the environment variables
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        
        // Check if the token is invalid or expired
        if (!decoded) {
            return res.status(404).json({ success: false, error: "Token Not Valid" });
        }

        // Fetch the user data from the database using the ID stored in the decoded token payload
        const user = await User.findById(decoded._id).select('-password'); // Exclude the password field
        
        // Check if the user does not exist in the database
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Attach the user object to the request object for downstream middleware or route handlers
        req.user = user;

        // Call the next middleware or route handler
        next();
    } catch (error) {
        // Log the error message for debugging purposes
        console.error(error.message);

        // Return a server error response if an exception occurs
        return res.status(500).json({ success: false, error: "Server error: " + error.message });
    }
};

// Export the verifyUser middleware for use in routes
export default verifyUser;
