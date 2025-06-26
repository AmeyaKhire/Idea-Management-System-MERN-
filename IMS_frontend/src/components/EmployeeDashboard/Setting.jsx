import React, { useState } from 'react';  // Importing React and useState hook for managing local state
import { useNavigate } from 'react-router-dom';  // Importing useNavigate for navigation after password change
import { useAuth } from '../../context/authContext';  // Importing useAuth to get the current user's authentication details
import axios from 'axios';  // Importing axios for making HTTP requests

const Setting = () => {
  const navigate = useNavigate();  // Hook to navigate programmatically
  const { user } = useAuth();  // Extracting the current user from context (assumed that it provides user data)
  const [setting, setSetting] = useState({  // Initializing state for form input fields
    userId: user._id,  // Setting userId based on the current user's ID
    oldPassword: "",  // State for old password field
    newPassword: "",  // State for new password field
    confirmPassword: "",  // State for confirming the new password
  });
  const [error, setError] = useState(null);  // State for holding error message

  // Handle form input changes and update state accordingly
  const handleChange = (e) => {
    const { name, value } = e.target;  // Destructuring to get input name and value
    setSetting({ ...setting, [name]: value });  // Updating the state with new value for corresponding field
  };

  // Handle form submission to change password
  const handleSubmit = async (e) => {
    e.preventDefault();  // Preventing default form submission behavior

    // Checking if new password and confirm password match
    if (setting.newPassword !== setting.confirmPassword) {
      setError("Passwords do not match");  // Setting error message if passwords don't match
    } else {
      try {
        // Sending PUT request to the server to change the password
        const response = await axios.put(
          "http://localhost:3000/api/setting/change-password",  // API endpoint for changing password
          setting,  // Sending the form data in the request body
          {
            headers: {
              // Including Authorization token from localStorage
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        // If response is successful, navigate to the employee dashboard
        if (response.data.success) {
          navigate("/employee-dashboard");  // Navigate to the dashboard page
          setError("");  // Resetting error message after successful password change
        }
      } catch (error) {
        // Handling error response from API if the password change fails
        if (error.response && !error.response.data.success) {
          setError(error.response.data.error);  // Setting error message from the response
        }
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Change Password</h2>
      {/* Displaying error message, if any */}
      <p className="text-red-500">{error}</p>
      <form onSubmit={handleSubmit}>  {/* Handling form submission */}
        {/* Old Password */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Old Password
          </label>
          <input
            type="password"
            name="oldPassword"
            onChange={handleChange}  // Updating state on input change
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required  // Making this field mandatory
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}  // Updating state on input change
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required  // Making this field mandatory
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}  // Updating state on input change
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            required  // Making this field mandatory
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
