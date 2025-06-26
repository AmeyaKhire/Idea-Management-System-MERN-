import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from '../../utils/DepartmentHelper';
import axios from 'axios';

// Component for displaying the list of departments
const DepartmentList = () => {
  // State to store all departments fetched from the API
  const [departments, setDepartments] = useState([]);
  // State to manage the loading state while fetching data
  const [depLoading, setDepLoading] = useState(false);
  // State to store the filtered list of departments based on search input
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  // Function to handle the deletion of a department
  const onDepartmentDelete = async (id) => {
    try {
      // Send a DELETE request to the API with the department ID
      await axios.delete(`http://localhost:3000/api/department/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      // Update the local state after successful deletion
      const updatedDepartments = departments.filter(dep => dep._id !== id);
      setDepartments(updatedDepartments); // Update the complete list
      setFilteredDepartments(updatedDepartments); // Update the filtered list
    } catch (error) {
      console.error("Error deleting department:", error); // Log any errors
    }
  };

  // Fetch the list of departments when the component is mounted
  useEffect(() => {
    const fetchDepartments = async () => {
      setDepLoading(true); // Set loading state to true
      try {
        // Fetch department data from the API
        const response = await axios.get('http://localhost:3000/api/department', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1; // Variable to maintain serial number
          // Map API data to a format suitable for display in the DataTable
          const data = response.data.departments.map((dep) => ({
            _id: dep._id,
            sno: sno++, // Assign a serial number
            dep_name: dep.dep_name, // Department name
            action: (
              <DepartmentButtons
                Id={dep._id}
                onDepartmentDelete={onDepartmentDelete} // Pass delete handler
              />
            ),
          }));
          setDepartments(data); // Set the full list of departments
          setFilteredDepartments(data); // Initialize filtered list
          console.log('Departments Data:', data); // Debugging log
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error); // Show error message
        }
      } finally {
        setDepLoading(false); // Set loading state to false
      }
    };

    fetchDepartments(); // Call the function to fetch departments
  }, []);

  // Function to filter departments based on search input
  const filterDepartments = (e) => {
    const records = departments.filter((dep) =>
      dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records); // Update the filtered list
  };

  return (
    <>
      {depLoading ? (
        // Show loading indicator while data is being fetched
        <div>Loading ....</div>
      ) : (
        <div className="p-5">
          <div className="text-center">
            <h3 className="text-2xl font-bold">Manage Departments</h3>
          </div>
          <div className="flex justify-between items-center my-4">
            {/* Search input to filter departments */}
            <input
              type="text"
              placeholder="Search By Dep Name"
              className="px-4 py-0.5 border"
              onChange={filterDepartments}
            />
            {/* Link to navigate to the Add Department page */}
            <Link
              to="/admin-dashboard/add-department"
              className="px-4 py-1 bg-teal-600 rounded text-white"
            >
              Add New Department
            </Link>
          </div>
          <div className="mt-5">
            {/* DataTable component to display the list of departments */}
            <DataTable
              columns={columns} // Columns configuration for the table
              data={filteredDepartments} // Data to display
              pagination // Enable pagination
            />
          </div>
        </div>
      )}
    </>
  );
};

export default DepartmentList;
