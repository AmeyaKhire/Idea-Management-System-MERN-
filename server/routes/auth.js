import express from 'express'; // Importing express module to handle routing
import { forgotPassword, login, resetPassword, verify } from '../controllers/authController.js'; // Importing controller functions for authentication-related operations
import authMiddleware from '../middleware/authMiddleware.js'; // Importing authentication middleware to protect certain routes
import { signup } from '../controllers/signupController.js'; // Importing signup controller function

// Creating an instance of the express router
const router = express.Router();

// Route for user login: Handles POST requests to '/login', invokes the login function from authController
router.post('/login', login);

// Route for user signup: Handles POST requests to '/signup', invokes the signup function from signupController
router.post('/signup', signup); // New route for signup

// Route for verifying user email: Handles GET requests to '/verify', invokes the verify function from authController
// This route is protected by authMiddleware, which ensures the user is authenticated before accessing it
router.get('/verify', authMiddleware, verify);

// Route for requesting a password reset link: Handles POST requests to '/forgot-password', invokes the forgotPassword function from authController
router.post('/forgot-password', forgotPassword);

// Route for resetting the password: Handles POST requests to '/reset-password/:token', invokes the resetPassword function from authController
// The :token parameter is used to verify the user’s password reset request
router.post('/reset-password/:token', resetPassword);

// Exporting the router to use in other parts of the application
export default router;
