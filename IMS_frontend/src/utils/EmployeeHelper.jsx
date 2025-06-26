import axios from "axios";
import { useNavigate } from "react-router-dom";

// Define columns for the employee table, including S No, Name, Employee ID, Department, DOB, and Actions
export const columns = [
  {
      name: "S No", // Serial number column
      selector: (row) => row.sno, // Get the serial number from the row data
      width: "70px" // Set the width of this column
  },
  {
      name: "Name", // Column for employee name
      selector: (row) => row.name, // Get the name from the row data
      sortable: true, // Enable sorting on this column
      width: "150px" // Set the width of this column
  },
  {
    name: "Employee ID", // New column for Employee ID
    selector: (row) => row.employeeId, // Ensure this matches your data structure
    sortable: true, // Enable sorting for Employee ID column
    width: "120px" // Set the width of this column
  },
  {
    name: "Department", // Column for the department name
    selector: (row) => row.dep_name, // Get the department name from the row data
    width: "160px" // Set the width of this column
  },
  {
    name: "DOB", // Column for Date of Birth
    selector: (row) => row.dob, // Get the date of birth from the row data
    sortable: true, // Enable sorting on the DOB column
    width: "130px" // Set the width of this column
  },
  {
      name: "Action", // Column for action buttons like View, Edit, Delete
      selector: (row) => row.action, // Get the action from the row data
      center: "true" // Center-align the content in this column
  },
]

// Fetch departments from the backend API
export const fetchDepartments = async () => {
    let departments;
    
    try {
      // Send a GET request to fetch departments
      const response = await axios.get('http://localhost:3000/api/department', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the auth token in the request header
        },
      });

      if (response.data.success) {
        departments = response.data.departments; // Store the fetched departments in the variable
      }
    } catch (error) {
      // Handle error if the request fails
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error); // Display error from the backend
      }
    }

    return departments; // Return the fetched departments
};

// EmployeeButtons component renders buttons for View, Edit, Delete, and Idea functionalities
export const EmployeeButtons = ({ Id }) => {
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    // Handle employee deletion
    const handleDelete = async () => {
        // Confirm deletion action from the user
        if (window.confirm("Are you sure you want to delete this employee? This action cannot be undone.")) {
            try {
                // Send DELETE request to the backend API to delete the employee
                const response = await axios.delete(`http://localhost:3000/api/employee/${Id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach auth token in request header
                    },
                });

                // If deletion is successful, alert the user and navigate to the employee list page
                if (response.data.success) {
                    alert("Employee deleted successfully.");
                    navigate('/admin-dashboard/employees'); // Redirect to the employees list page after deletion
                }
            } catch (error) {
                // Handle error if the deletion fails
                alert("Error deleting employee: " + error.response.data.error); // Display the error message
            }
        }
    };

    // Render buttons for different actions: View, Edit, Idea, and Delete
    return (
        <div className="flex space-x-3">
            {/* View button navigates to the employee details page */}
            <button
                className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/${Id}`)} // Navigate to the employee's details page
            >
                View
            </button>

            {/* Edit button navigates to the employee edit page */}
            <button
                className="px-3 py-1 bg-blue-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)} // Navigate to the employee edit page
            >
                Edit
            </button>

            {/* Idea button navigates to the employee ideas page */}
            <button
                className="px-3 py-1 bg-red-600 text-white"
                onClick={() => navigate(`/admin-dashboard/employees/ideas/${Id}`)} // Navigate to the employee's idea page
            >
                Idea
            </button>

            {/* Delete button triggers the handleDelete function */}
            <button
                className="px-3 py-1 bg-red-700 text-white"
                onClick={handleDelete} // Call handleDelete on click to delete the employee
            >
                Delete
            </button>
        </div>
    );
};
