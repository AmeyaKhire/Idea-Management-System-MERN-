import { useNavigate } from "react-router-dom"
import axios from "axios"
import PropTypes from "prop-types";

// Define columns for the DataTable, each column has a name and selector to extract values from the row
export const columns = [
    {
        name: "S No", // Column name for serial number
        selector: (row) => row.sno // Selector to get serial number from the row data
    },
    {
        name: "Department Name", // Column name for department name
        selector: (row) => row.dep_name, // Selector to get department name from the row data
        sortable: true // Allow sorting of department name column
    },
    {
        name: "Action", // Column name for actions like Edit and Delete
        selector: (row) => row.action // Selector for actions column
    },
]

// DepartmentButtons component renders Edit and Delete buttons for each department
export const DepartmentButtons = ({Id, onDepartmentDelete}) => {
    const navigate = useNavigate() // useNavigate hook for navigation in react-router

    // Handle department deletion
    const handleDelete = async (id) => {
        // Show confirmation before deleting the department
        const confirm = window.confirm("Do you want to delete?");
        
        if (confirm) {
            try {
                // Make DELETE request to the backend API to delete the department
                const response = await axios.delete(
                    `http://localhost:3000/api/department/${id}`, 
                    {
                        headers: {
                            // Attach authorization token from localStorage in the request header
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );

                console.log(response.data) // Log the response data for debugging
                
                // If the deletion is successful, call onDepartmentDelete to update the UI
                if (response.data.success) {
                    onDepartmentDelete(); // Trigger parent function to handle state change after deletion
                }
            } catch (error) {
                // Handle error if the deletion fails
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error); // Show error message if returned from the backend
                }
            }
        }
    };

    // Render Edit and Delete buttons with onClick event handlers
    return (
        <div className="flex space-x-3">
            {/* Edit button redirects to the edit page for the department */}
            <button 
                className="px-3 py-1 bg-teal-600 text-white"
                onClick={() => navigate(`/admin-dashboard/department/${Id}`)} // Navigate to department edit page
            >
                Edit
            </button>
            
            {/* Delete button triggers the handleDelete function */}
            <button 
                className="px-3 py-1 bg-red-600 text-white"
                onClick={() => handleDelete(Id)} // Call handleDelete with department ID
            >
                Delete
            </button>
        </div>
    );
}

// Add prop validation for DepartmentButtons component to ensure correct data types
DepartmentButtons.propTypes = {
    Id: PropTypes.string.isRequired, // Department ID is required and should be a string
    onDepartmentDelete: PropTypes.func.isRequired, // onDepartmentDelete is a required function
};
