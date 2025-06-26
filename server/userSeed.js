// Importing the required modules and files
import User from './models/User.js';  // User model for interacting with the database
import bcrypt from 'bcrypt';  // Library for hashing passwords
import connectToDatabase from './db/db.js';  // Function to establish connection to MongoDB

// Function to register a new user
const userRegister = async () => {
    // Establishing connection to the database
    connectToDatabase();

    try {
        // Hashing the password 'admin' using bcrypt with a saltRounds value of 10
        const hashPassword = await bcrypt.hash("admin", 10);

        // Creating a new user object with hashed password and default admin details
        const newUser = new User({
            name: "Admin",               // User's name
            email: "admin@gmail.com",    // User's email
            password: hashPassword,      // Hashed password
            role: "admin"                // User's role as admin
        });

        // Saving the new user to the database
        await newUser.save();
    } catch (error) {
        // Logging any error that occurs during the process
        console.log(error);
    }
}

// Calling the function to register the user
userRegister();
