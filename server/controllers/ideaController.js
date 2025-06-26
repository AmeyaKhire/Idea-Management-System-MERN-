// Import necessary modules and models
import { response } from 'express';
import Employee from '../models/Employee.js';
import Idea from '../models/Idea.js';
import { sendEmail } from '../MailConfig/mailer.js';

// Controller function to add a new idea
const addIdea = async (req, res) => {
    try {
        // Extract idea details from the request body
        const { userId, title, description, impact, appliedDate } = req.body;

        // Find the employee by userId and populate necessary details
        const employee = await Employee.findOne({ userId })
            .populate('userId') // Populate user details
            .populate('department'); // Populate department details

        // If employee is not found, return an error response
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        // Create a new idea associated with the employee
        const newIdea = new Idea({
            employeeId: employee._id,
            title,
            description,
            impact,
            appliedDate,
        });

        // Save the idea in the database
        await newIdea.save();

        // Send an email notification to the admin about the new idea
        const adminEmail = 'ameyakhire@gmail.com'; // Replace with actual admin email
        const websiteLink = 'http://localhost:5173/login'; // Replace with actual website URL

        const emailSubject = 'New Idea Submitted';
        const emailBody = `
            <p>Dear Admin,</p>
            <p>A new idea titled "<strong>${title}</strong>" has been submitted.</p>
            <ul>
                <li><strong>Name:</strong> ${employee.userId.name}</li>
                <li><strong>Employee ID:</strong> ${employee.employeeId}</li> 
                <li><strong>Department:</strong> ${employee.department ? employee.department.dep_name : 'N/A'}</li>
                <li><strong>Designation:</strong> ${employee.designation}</li>
            </ul>
            <p>Details of the idea:</p>
            <ul>
                <li><strong>Description:</strong> ${description}</li>
                <li><strong>Impact:</strong> ${impact}</li>
                <li><strong>Applied Date:</strong> ${new Date(appliedDate).toLocaleDateString()}</li>
            </ul>
            <p>Thank you,<br />TKIL Team</p>
        `;
        await sendEmail(adminEmail, emailSubject, emailBody);

        // Return success response
        return res.status(200).json({ success: true });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "idea add server error" });
    }
};

// Controller function to fetch ideas for a specific employee
const getIdea = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch ideas for the given employee ID
        let ideas = await Idea.find({ employeeId: id });
        if (!ideas || ideas.length === 0) {
            const employee = await Employee.findOne({ userId: id });
            ideas = await Idea.find({ employeeId: employee._id });
        }

        return res.status(200).json({ success: true, ideas });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "idea fetch server error" });
    }
};

// Controller function to fetch all ideas
const getIdeas = async (req, res) => {
    try {
        // Fetch all ideas and populate related employee details
        const ideas = await Idea.find().populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userId', select: 'name' }
            ]
        });

        return res.status(200).json({ success: true, ideas });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "idea fetch server error" });
    }
};

// Controller function to fetch details of a specific idea
const getIdeaDetail = async (req, res) => {
    try {
        const { id } = req.params;

        // Fetch idea by ID and populate related details
        const idea = await Idea.findById({ _id: id }).populate({
            path: "employeeId",
            populate: [
                { path: 'department', select: 'dep_name' },
                { path: 'userId', select: 'name' }
            ]
        });

        return res.status(200).json({ success: true, idea });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "idea fetch server error" });
    }
};

// Controller function to update the status and remarks of an idea
const updateIdea = async (req, res) => {
    try {
        const { id } = req.params;
        const { status, remarks } = req.body;

        // Update the idea's status and remarks
        const idea = await Idea.findByIdAndUpdate(
            { _id: id },
            { status, remarks },
            { new: true }
        );

        if (!idea) {
            return res.status(404).json({ success: false, error: "Idea not found" });
        }

        // Send email notification to the employee about the status update
        const employee = await Employee.findById(idea.employeeId).populate('userId');
        const emailSubject = 'Your Idea Status Update';
        const emailBody = `
            <p>Dear ${employee.userId.name},</p>
            <p>Your idea titled "<strong>${idea.title}</strong>" has been ${status.toLowerCase()}.</p>
            <p><strong>Remarks:</strong> ${remarks}</p>
            <p>Thank you for your contribution to TKIL!</p>
        `;
        await sendEmail(employee.userId.email, emailSubject, emailBody);

        return res.status(200).json({ success: true, idea });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ success: false, error: "idea update server error" });
    }
};

// Export controller functions
export { addIdea, getIdea, getIdeas, getIdeaDetail, updateIdea };
