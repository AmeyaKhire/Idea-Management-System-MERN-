import express from 'express'; // Importing express module to handle routing
import authMiddleware from '../middleware/authMiddleware.js'; // Importing authentication middleware to protect routes
import { addIdea, getIdea, getIdeas, getIdeaDetail, updateIdea } from '../controllers/ideaController.js'; // Importing idea-related controller functions

// Creating an instance of the express router
const router = express.Router();

// Route to add a new idea: Handles POST requests to '/add'
// This route is protected by authMiddleware, ensuring only authenticated users can access it
router.post('/add', authMiddleware, addIdea);

// Route to get a specific idea by its ID: Handles GET requests to '/:id'
// The ':id' parameter specifies which idea to fetch, and the route is protected by authMiddleware
router.get('/:id', authMiddleware, getIdea);

// Route to get detailed information about a specific idea by its ID: Handles GET requests to '/detail/:id'
// This route is also protected by authMiddleware and provides additional information about the idea
router.get('/detail/:id', authMiddleware, getIdeaDetail);

// Route to get all ideas: Handles GET requests to '/'
// This route is protected by authMiddleware, ensuring only authenticated users can access it
router.get('/', authMiddleware, getIdeas);

// Route to update an existing idea by its ID: Handles PUT requests to '/:id'
// The ':id' parameter specifies which idea to update, and this route is protected by authMiddleware
router.put('/:id', authMiddleware, updateIdea);

// Exporting the router to use in other parts of the application
export default router;
