import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Component to add a new department
const AddDepartment = () => {
    // State to hold form data for the department
    const [department, setDepartment] = useState({
        dep_name: '',      // Holds the department name
        description: ''    // Holds the department description
    });

    // Hook for programmatic navigation
    const navigate = useNavigate();

    // Handle changes to input fields
    const handleChange = (e) => {
        const { name, value } = e.target; // Extract name and value from the event target
        setDepartment({ ...department, [name]: value }); // Update state dynamically
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Send POST request to the backend API to add a new department
            const response = await axios.post('http://localhost:3000/api/department/add', department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}` // Include auth token in headers
                }
            });

            // Navigate to the departments page if the response indicates success
            if (response.data.success) {
                navigate("/admin-dashboard/departments");
            }
        } catch (error) {
            // Handle errors, such as validation issues or server errors
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error); // Display error message from the backend
            }
        }
    };

    // Render the Add Department form
    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Add New Department</h2>
            <form onSubmit={handleSubmit}>
                {/* Input for Department Name */}
                <div>
                    <label
                        htmlFor="depname"
                        className="text-sm font-medium text-gray-700"
                    >
                        Department Name
                    </label>
                    <input
                        type="text"
                        name="dep_name"
                        onChange={handleChange} // Update state on change
                        placeholder="Department Name"
                        className="mt-1 w-full p-2 border-gray-300 rounded-md"
                        required // Make field mandatory
                    />
                </div>

                {/* Textarea for Department Description */}
                <div className="mt-3">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Description
                    </label>
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange} // Update state on change
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                        rows="4" // Define number of visible rows
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Department
                </button>
            </form>
        </div>
    );
};

export default AddDepartment;
