import express from 'express'; // Importing express module to handle routing
import authMiddleware from '../middleware/authMiddleware.js'; // Importing authentication middleware to protect routes
import { getSummary, getEmployeeIdeaSummary } from '../controllers/dashboardController.js'; // Importing controller functions for dashboard-related operations

// Creating an instance of the express router
const router = express.Router();

// Route to get the summary of all ideas: Handles GET requests to '/summary'
// This route is protected by authMiddleware, which ensures the user is authenticated before accessing it
router.get('/summary', authMiddleware, getSummary);

// Route to get the idea summary for a specific employee: Handles GET requests to '/employee-summary/:employeeId'
// The ':employeeId' parameter is used to get the summary for that specific employee
// This route is also protected by authMiddleware to ensure only authenticated users can access it
router.get('/employee-summary/:employeeId', authMiddleware, getEmployeeIdeaSummary);

// Exporting the router to use in other parts of the application
export default router;
