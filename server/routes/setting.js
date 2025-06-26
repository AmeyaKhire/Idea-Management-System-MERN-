import express from 'express'; // Importing express module to handle routing
import authMiddleware from '../middleware/authMiddleware.js'; // Importing authentication middleware to protect routes
import { changePassword } from '../controllers/settingController.js'; // Importing the changePassword controller function

// Creating an instance of the express router
const router = express.Router();

// Route to change the user's password: Handles PUT requests to '/change-password'
// This route is protected by authMiddleware, ensuring only authenticated users can access it
router.put('/change-password', authMiddleware, changePassword);

// Exporting the router to use in other parts of the application
export default router;
