import React, { useEffect, useState } from "react"; // Importing React, useEffect, and useState hooks
import { fetchDepartments } from "../../utils/EmployeeHelper"; // Importing helper function to fetch departments
import axios from "axios"; // Importing axios to make HTTP requests
import { useNavigate, useParams } from "react-router-dom"; // Importing useNavigate and useParams hooks for routing and accessing URL params

const Edit = () => {
  // State to store employee data (name, designation, department)
  const [employee, setEmployee] = useState({
    name: '',
    designation: '',
    department: ''
  });

  // State to store departments list
  const [departments, setDepartments] = useState(null);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Extracting employee ID from URL params
  const { id } = useParams();

  useEffect(() => {
    // Fetch departments on component mount
    const getDepartments = async () => {
      try {
        const departments = await fetchDepartments(); // Fetch departments using helper function
        setDepartments(departments); // Store fetched departments in state
      } catch (error) {
        console.error("Error fetching departments:", error); // Log error if fetching fails
      }
    };
    getDepartments(); // Call the function to fetch departments
  }, []); // Empty dependency array to fetch departments only once when the component mounts

  useEffect(() => {
    // Fetch employee data based on the ID from URL params
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Sending token in Authorization header
          },
        });

        if (response.data.success) { // Check if response is successful
          const employee = response.data.employee; // Extract employee data from response
          setEmployee((prev) => ({
            ...prev,
            name: employee.userId.name, // Set employee name
            designation: employee.designation, // Set employee designation
            department: employee.department // Set employee department
          }));
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error); // Alert user if there is an error fetching employee data
        }
      }
    };

    fetchEmployee(); // Call the function to fetch employee data
  }, [id]); // Re-run effect whenever the employee ID changes (i.e., component is re-rendered)

  // Function to handle input field changes
  const handleChange = (e) => {
    const { name, value } = e.target; // Get name and value of the input field
    setEmployee((prevData) => ({
      ...prevData, // Keep previous form data
      [name]: value, // Update the specific field in employee data
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await axios.put(
        `http://localhost:3000/api/employee/${id}`, // PUT request to update employee
        employee, // Send employee data as request body
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Authorization header
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );

      if (response.data.success) { // Check if the update was successful
        navigate("/admin-dashboard/employees"); // Navigate to the employees page
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Alert user if update fails
      } else {
        console.error("Error updating employee:", error.message); // Log error message if something goes wrong
      }
    }
  };

  return (
    <>
      {/* Show loading message if departments or employee data are not yet fetched */}
      {departments && employee ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Edit Employee</h2>
          <form onSubmit={handleSubmit}> {/* Handle form submission */}
            <div className="space-y-4"> {/* Vertical spacing for form fields */}
              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="name" // Bind input field to 'name' state
                  value={employee.name} // Display current employee name in input
                  onChange={handleChange} // Handle input change
                  placeholder="Insert Name"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Designation Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Designation</label>
                <input
                  type="text"
                  name="designation" // Bind input field to 'designation' state
                  onChange={handleChange} // Handle input change
                  value={employee.designation} // Display current employee designation
                  placeholder="Designation"
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Department Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Department</label>
                <select
                  name="department" // Bind dropdown to 'department' state
                  onChange={handleChange} // Handle department change
                  value={employee.department} // Display current employee department
                  className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Department</option> {/* Placeholder option */}
                  {departments.map((dep) => ( // Map through departments to create options
                    <option key={dep._id} value={dep._id}>
                      {dep.dep_name} {/* Display department name */}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit" // Submit the form to update employee
              className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Edit Employee
            </button>
          </form>
        </div>
      ) : (
        <div>Loading...</div> // Show loading message while fetching data
      )}
    </>
  );
};

export default Edit; // Export Edit component for use in other parts of the app
