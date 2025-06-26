import mongoose from "mongoose"; // Importing mongoose to interact with MongoDB
const { Schema } = mongoose; // Destructuring to extract the Schema constructor from mongoose

// Define the schema for an 'Idea'
const ideaSchema = new Schema(
  {
    // Reference to the 'Employee' model, linking an idea to the employee who submitted it
    employeeId: { 
      type: Schema.Types.ObjectId, // MongoDB ObjectId reference type
      ref: "Employee", // Specifies that this field references the 'Employee' model
      required: true, // Ensures every idea is associated with an employee
    },
    title: { 
      type: String, // The title of the idea
      required: true, // Title is mandatory for each idea
    },
    description: { 
      type: String, // A detailed description of the idea
      required: true, // Description is mandatory for each idea
    },
    impact: {
      type: String,
      enum: [
        "O-Safety and Environment", // Category for ideas focused on safety and environmental impact
        "P-Process Improvement", // Category for ideas targeting process improvement
        "Q-Quality, Productivity and Cost", // Category for ideas that affect quality, productivity, and cost
        "M-Monitor and Control", // Category for ideas related to monitoring and control systems
        "E-Evaluate Predict", // Category for ideas related to evaluation and prediction
        "S-Speed and Accuracy", // Category for ideas improving speed and accuracy
        "A-Automate and Optimize", // Category for ideas focused on automation and optimization
        "C-Customer Experience", // Category for ideas that enhance the customer experience
        "X-Security", // Category for ideas targeting security improvements
      ],
      required: true, // Impact category is required for every idea
    },
    appliedDate: { 
      type: Date, // Date when the idea was submitted or applied
      required: true, // Applied date is mandatory for each idea
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"], // The status of the idea: pending, approved, or rejected
      default: "Pending", // Default status is 'Pending' when the idea is created
    },
    remarks: { 
      type: String, // Optional remarks or comments about the idea (e.g., feedback or suggestions)
    }
  },
  { 
    timestamps: true // Adds createdAt and updatedAt timestamps automatically for the idea
  }
);

// Create the 'Idea' model using the defined schema
const Idea = mongoose.model("Idea", ideaSchema);

// Export the Idea model for use in other parts of the application
export default Idea;
