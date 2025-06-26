import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../utils/EmployeeHelper"; // Adjust path as necessary

const Signup = () => {
    // State to store the list of departments fetched from the API
    const [departments, setDepartments] = useState([]);
    
    // State to manage form data (user input values)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        employeeId: "",
        designation: "",
        department: "",
        password: ""
    });

    // useNavigate hook to programmatically redirect after successful signup
    const navigate = useNavigate();

    // useEffect hook to fetch the list of departments when the component mounts
    useEffect(() => {
        const getDepartments = async () => {
            try {
                // Fetch departments from the helper function
                const departments = await fetchDepartments();
                setDepartments(departments); // Update state with fetched departments
            } catch (error) {
                console.error("Error fetching departments:", error); // Log any errors
            }
        };
        
        getDepartments(); // Call function to fetch departments
    }, []); // Empty dependency array ensures this runs only once when the component mounts

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update formData state based on the input field name
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Password validation: Check if the password is at least 8 characters long
        if (formData.password.length < 8) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        try {
            // Send form data to the API to create a new user account
            const response = await axios.post(
                "http://localhost:3000/api/auth/signup",
                formData
            );

            // If the signup is successful, redirect to the login page
            if (response.data.success) {
                navigate("/login"); // Redirect to login after successful signup
            }
        } catch (error) {
            // Handle any errors during the signup request
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error); // Show error message from response
            } else {
                console.error("Error during signup:", error.message); // Log error for debugging
            }
        }
    };

    return (
      <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Signup</h2>
          <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Input field for Name */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input 
                        type="text" 
                        name="name" 
                        onChange={handleChange} 
                        placeholder="Insert Name" 
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                      />
                  </div>

                  {/* Input field for Email */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        onChange={handleChange} 
                        placeholder="Insert Email" 
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                      />
                  </div>

                  {/* Input field for Employee ID */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Employee ID</label>
                      <input 
                        type="text" 
                        name="employeeId" 
                        onChange={handleChange} 
                        placeholder="Employee ID" 
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                      />
                  </div>

                   {/* Dropdown for Department selection */}
                   <div>
                      <label className="block text-sm font-medium text-gray-700">Department</label>
                      <select 
                        name="department" 
                        onChange={handleChange} 
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                      >
                          <option value="">Select Department</option>
                          {departments.map((dep) => (
                              <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                          ))}
                      </select>
                  </div>

                  {/* Input field for Designation */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Designation</label>
                      <input 
                        type="text" 
                        name="designation" 
                        onChange={handleChange} 
                        placeholder="Designation" 
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                      />
                  </div>

                  {/* Input field for Password */}
                  <div>
                      <label className="block text-sm font-medium text-gray-700">Password</label>
                      <input 
                        type="password" 
                        name="password" 
                        onChange={handleChange} 
                        placeholder="******" 
                        required 
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md" 
                      />
                  </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
              >
                  Signup
              </button>
          </form>
      </div>
    );
};

export default Signup;
