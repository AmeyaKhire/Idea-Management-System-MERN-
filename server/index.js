// Importing dotenv to load environment variables from the .env file
import dotenv from 'dotenv';
dotenv.config();

// Importing required modules
import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth.js';  // Authentication routes
import departmentRouter from './routes/department.js';  // Department management routes
import employeeRouter from './routes/employee.js';  // Employee management routes
import ideaRouter from './routes/idea.js';  // Idea management routes
import settingRouter from './routes/setting.js';  // Settings routes
import dashboardRouter from './routes/dashboard.js';  // Dashboard related routes
import connectToDatabase from './db/db.js';  // Database connection function

// Establishing connection to the MongoDB database
connectToDatabase();

// Initializing the Express application
const app = express();

// Setting up CORS to allow cross-origin requests
app.use(cors());

// Middleware to parse incoming request data as JSON
app.use(express.json()); 

// Defining route handlers for different sections of the API
app.use('/api/auth', authRouter);  // Authentication-related routes
app.use('/api/department', departmentRouter);  // Department-related routes
app.use('/api/employee', employeeRouter);  // Employee-related routes
app.use('/api/idea', ideaRouter);  // Idea-related routes
app.use('/api/setting', settingRouter);  // Settings-related routes
app.use('/api/dashboard', dashboardRouter);  // Dashboard-related routes

// Starting the server and listening on the port specified in the .env file
app.listen(process.env.PORT, () => {
    console.log(`Server is Running on port ${process.env.PORT}`);
});
