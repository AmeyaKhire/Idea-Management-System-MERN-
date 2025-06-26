import React, { useState, useEffect } from "react";  // Importing React and necessary hooks
import { useNavigate } from "react-router-dom";  // Importing `useNavigate` for navigation after form submission
import { useAuth } from "../../context/authContext";  // Importing custom `useAuth` hook for getting authenticated user's data
import axios from "axios";  // Importing axios for making HTTP requests

const Add = () => {
  const { user } = useAuth();  // Using `useAuth` to get the authenticated user

  const navigate = useNavigate();  // Initialize `navigate` to navigate between routes

  // Initializing form data with default values
  const [formData, setFormData] = useState({
    userId: user._id,  // Setting user ID from context
    title: "",  // Placeholder for idea title
    description: "",  // Placeholder for idea description
    impact: "",  // Placeholder for idea impact
    appliedDate: new Date().toISOString().split("T")[0],  // Default to today's date in YYYY-MM-DD format
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;  // Destructuring name and value from the input element
    setFormData((prevState) => ({
      ...prevState,  // Preserve previous form data
      [name]: value,  // Update the specific field that changed
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior
    try {
      // Sending a POST request to add the idea to the backend
      const response = await axios.post(
        `http://localhost:3000/api/idea/add`,  // API endpoint for adding an idea
        formData,  // Sending form data
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,  // Passing the authorization token from local storage
          },
        }
      );

      console.log(response.data);  // Log the response from the API

      // If the request is successful, navigate to the user's ideas page
      if (response.data.success) {
        navigate(`/employee-dashboard/ideas/${user._id}`);  // Redirect to the ideas page
      }
    } catch (error) {
      // If there's an error in the response, show an error alert
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);  // Alert the error message from the server
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      {/* Heading for the page */}
      <h2 className="text-2xl font-bold mb-6">Add New Idea</h2>
      
      {/* Form for submitting a new idea */}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          
          {/* Idea Title Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idea Title
            </label>
            <textarea
              name="title"  // Name attribute for input field, corresponding to `formData.title`
              placeholder="Title"
              value={formData.title}  // Bind the input value to the form state
              onChange={handleChange}  // Handle changes to this field
              className="w-full border border-gray-300 p-2 rounded-md"
              required  // Makes the field required
            ></textarea>
          </div>

          {/* Idea Description Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idea Description
            </label>
            <textarea
              name="description"  // Name attribute for input field, corresponding to `formData.description`
              placeholder="Description"
              value={formData.description}  // Bind the input value to the form state
              onChange={handleChange}  // Handle changes to this field
              className="w-full border border-gray-300 p-2 rounded-md"
              required  // Makes the field required
            ></textarea>
          </div>

          {/* Idea Impact Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Idea Impact
            </label>
            <select
              name="impact"  // Name attribute for input field, corresponding to `formData.impact`
              value={formData.impact}  // Bind the select value to the form state
              onChange={handleChange}  // Handle changes to this field
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required  // Makes the field required
            >
              <option value="">Select Idea Impact</option>
              <option value="O-Safety and Environment">O-Safety and Environment</option>
              <option value="P-Process Improvement">P-Process Improvement</option>
              <option value="Q-Quality, Productivity and Cost">
                Q-Quality, Productivity and Cost
              </option>
              <option value="M-Monitor and Control">M-Monitor and Control</option>
              <option value="E-Evaluate Predict">E-Evaluate Predict</option>
              <option value="S-Speed and Accuracy">S-Speed and Accuracy</option>
              <option value="A-Automate and Optimize">A-Automate and Optimize</option>
              <option value="C-Customer Experience">C-Customer Experience</option>
              <option value="X-Security">X-Security</option>
            </select>
          </div>

          {/* Applied Date Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Applied Date
            </label>
            <input
              type="date"
              name="appliedDate"  // Name attribute for input field, corresponding to `formData.appliedDate`
              value={formData.appliedDate}  // Bind the input value to the form state
              onChange={handleChange}  // Handle changes to this field
              className="w-full border border-gray-300 p-2 rounded-md"
              required  // Makes the field required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"  // On click, it triggers the `handleSubmit` function
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Add;
