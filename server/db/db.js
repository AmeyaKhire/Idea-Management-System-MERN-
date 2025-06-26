import mongoose from 'mongoose'; // Import the mongoose library for MongoDB interactions

// Function to establish a connection to the MongoDB database
const connectToDatabase = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,       // Use the new URL string parser to handle connection strings
            useUnifiedTopology: true,   // Enable the new unified topology layer for MongoDB driver
        });

        // Log a success message if the connection is established
        console.log('Connected to MongoDB');
    } catch (error) {
        // Log an error message if the connection fails
        console.error('Error connecting to MongoDB:', error.message);

        // Exit the application with a failure code (1) to signal the issue
        process.exit(1);
    }
};

// Export the database connection function for use in other parts of the application
export default connectToDatabase;
