import React, { useEffect, useState } from "react";
import { fetchDepartments } from "../../utils/EmployeeHelper"; // Importing helper function to fetch departments
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook for programmatic navigation

const Add = () => {
  const [departments, setDepartments] = useState([]); // State to hold the list of departments
  const [formData, setFormData] = useState({
    name: "", // Employee name
    email: "", // Employee email
    employeeId: "", // Employee ID
    designation: "", // Employee designation
    department: "", // Selected department
    password: "", // Employee password
    role: "" // Employee role
  });

  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    const getDepartments = async () => { // Function to fetch departments
      try {
        const departments = await fetchDepartments(); // Fetch departments from the helper function
        setDepartments(departments); // Update state with fetched departments
      } catch (error) {
        console.error("Error fetching departments:", error); // Log error if fetching fails
      }
    };
    getDepartments(); // Call the getDepartments function on component mount
  }, []); // Empty dependency array means it runs only once on mount

  const handleChange = (e) => {
    const { name, value } = e.target; // Destructure name and value from the input element
    setFormData((prevData) => ({
      ...prevData, // Spread previous form data
      [name]: value, // Update the specific field in form data
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post(
        "http://localhost:3000/api/employee/add", // POST request to add employee
        formData, // Sending the form data as request body
        {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`, // Authorization header with token from localStorage
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees"); // Navigate to employees dashboard if successful
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Alert user if there's an error from the backend
      } else {
        console.error("Error adding employee:", error.message); // Log any other errors
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name" // Input field for employee name
              onChange={handleChange} // Handle input change
              placeholder="Insert Name"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email" // Input field for employee email
              onChange={handleChange} // Handle input change
              placeholder="Insert Email"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Employee ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Employee ID</label>
            <input
              type="text"
              name="employeeId" // Input field for employee ID
              onChange={handleChange} // Handle input change
              placeholder="Employee ID"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department" // Dropdown to select department
              onChange={handleChange} // Handle department change
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Department</option>
              {departments.map((dep) => ( // Map through departments and render options
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name} {/* Display department name */}
                </option>
              ))}
            </select>
          </div>

          {/* Designation */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Designation</label>
            <input
              type="text"
              name="designation" // Input field for employee designation
              onChange={handleChange} // Handle input change
              placeholder="Designation"
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password" // Input field for employee password
              placeholder="******"
              onChange={handleChange} // Handle input change
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select
              name="role" // Dropdown to select employee role
              onChange={handleChange} // Handle role change
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option> {/* Option for Admin role */}
              <option value="employee">Employee</option> {/* Option for Employee role */}
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit" // Submit button to add employee
          className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Employee
        </button>
      </form>
    </div>
  );
};

export default Add;
