import mongoose from "mongoose"; // Importing mongoose to interact with MongoDB

// Define the schema for the 'User' model
const userSchema = new mongoose.Schema({
    // The 'name' field: Required string field for the user's name
    name: { 
        type: String, 
        required: true 
    },
    
    // The 'email' field: Required string field for the user's email
    email: { 
        type: String, 
        required: true 
    },
    
    // The 'password' field: Required string field for the user's password
    password: { 
        type: String, 
        required: true 
    },
    
    // The 'role' field: String field that must be either 'admin' or 'employee', required for every user
    role: { 
        type: String, 
        enum: ["admin", "employee"], // Enums ensure the role is one of the specified values
        required: true 
    },
    
    // The 'isActive' field: Boolean field to track if the user's account is active (defaults to false)
    isActive: { 
        type: Boolean, 
        default: false // Account is inactive by default
    },

    // The 'createAt' field: Date field representing when the user was created (defaults to current date/time)
    createAt: { 
        type: Date, 
        default: Date.now 
    },
    
    // The 'updatedAt' field: Date field representing when the user was last updated (defaults to current date/time)
    updatedAt: { 
        type: Date, 
        default: Date.now 
    },
});

// Create the 'User' model using the defined schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of the application
export default User;
