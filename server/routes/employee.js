import express from 'express'; // Importing express module to handle routing
import authMiddleware from '../middleware/authMiddleware.js'; // Importing authentication middleware to protect routes
import { addEmployee, getEmployees, getEmployee, updateEmployee, deleteEmployee } from '../controllers/employeeController.js'; // Importing employee-related controller functions

// Creating an instance of the express router
const router = express.Router();

// Route to get all employees: Handles GET requests to '/'
// This route is protected by authMiddleware, ensuring only authenticated users can access it
router.get('/', authMiddleware, getEmployees);

// Route to add a new employee: Handles POST requests to '/add'
// This route is also protected by authMiddleware, ensuring only authenticated users can access it
router.post('/add', authMiddleware, addEmployee);

// Route to get a specific employee by its ID: Handles GET requests to '/:id'
// The ':id' parameter specifies which employee to fetch, and the route is protected by authMiddleware
router.get('/:id', authMiddleware, getEmployee);

// Route to update a specific employee by its ID: Handles PUT requests to '/:id'
// The ':id' parameter specifies which employee to update, and this route is protected by authMiddleware
router.put('/:id', authMiddleware, updateEmployee);

// Route to delete a specific employee by its ID: Handles DELETE requests to '/:id'
// The ':id' parameter specifies which employee to delete, and this route is also protected by authMiddleware
router.delete('/:id', authMiddleware, deleteEmployee);

// Exporting the router to use in other parts of the application
export default router;
