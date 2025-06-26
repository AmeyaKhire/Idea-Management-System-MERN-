import express from 'express'; // Importing express module to handle routing
import authMiddleware from '../middleware/authMiddleware.js'; // Importing authentication middleware to protect routes
import { addDepartment, getDepartments, getDepartment, updateDepartment, deleteDepartment } from '../controllers/departmentController.js'; // Importing department-related controller functions

// Creating an instance of the express router
const router = express.Router();

// Route to get all departments: Handles GET requests to '/'
// This route is protected by authMiddleware, ensuring only authenticated users can access it
router.get('/', authMiddleware, getDepartments);

// Route to add a new department: Handles POST requests to '/add'
// This route is also protected by authMiddleware, ensuring only authenticated users can access it
router.post('/add', authMiddleware, addDepartment);

// Route to get a specific department by its ID: Handles GET requests to '/:id'
// The ':id' parameter specifies which department to fetch, and the route is protected by authMiddleware
router.get('/:id', authMiddleware, getDepartment);

// Route to update a specific department by its ID: Handles PUT requests to '/:id'
// The ':id' parameter specifies which department to update, and this route is protected by authMiddleware
router.put('/:id', authMiddleware, updateDepartment);

// Route to delete a specific department by its ID: Handles DELETE requests to '/:id'
// The ':id' parameter specifies which department to delete, and this route is also protected by authMiddleware
router.delete('/:id', authMiddleware, deleteDepartment);

// Exporting the router to use in other parts of the application
export default router;
