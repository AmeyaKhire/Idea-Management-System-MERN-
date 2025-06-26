import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';  // Importing necessary columns and buttons
import DataTable from 'react-data-table-component'; // Importing DataTable component for displaying data in a tabular format
import axios from 'axios'; // Importing axios for making API requests

const List = () => {
  // State hooks to manage employee data, loading state, and filtered employees
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  // useEffect hook to fetch employee data from API on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);  // Set loading state to true when fetching data
      try {
        console.log('Fetching employee data...');

        // Making the API request to fetch employees
        const response = await axios.get('http://localhost:3000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Authorization header with JWT token
          },
        });

        console.log('API Response:', response.data);

        // Check if the response is successful
        if (response.data.success) {
          let sno = 1;  // Serial number for employees in the table
          
          // Transforming API response data into a format compatible with DataTable
          const data = response.data.employees.map((emp) => {
            console.log('Mapping employee:', emp);
            return {
              _id: emp._id,  // Employee ID
              sno: sno++,  // Serial number for each employee
              dep_name: emp.department?.dep_name || 'N/A', // Employee's department, or 'N/A' if not available
              name: emp.userId?.name || 'N/A', // Employee's name, accessing it from userId, or 'N/A' if not available
              employeeId: emp.employeeId || 'N/A',  // Employee's ID, or 'N/A' if not available
              dob: emp.dob ? new Date(emp.dob).toDateString() : 'N/A', // Employee's date of birth, formatted, or 'N/A'
              action: <EmployeeButtons Id={emp._id} />, // Render action buttons for editing/deleting employee
            };
          });
          console.log('Transformed Employee Data:', data);

          // Set the employees state with the transformed data and update filtered employees state
          setEmployees(data);
          setFilteredEmployees(data);
        } else {
          console.error('API response indicates failure:', response.data);
        }
        
      } catch (error) {
        console.error('Error fetching employees:', error);

        // If there's an error in the response, show an alert with the error message
        if (error.response && error.response.data && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);  // Set loading state to false after fetching is complete
      }
    };

    fetchEmployees();  // Call the function to fetch employee data when component mounts
  }, []);  // Empty dependency array ensures this effect runs only once when the component mounts

  // Function to handle employee search/filter by name
  const handleFilter = (e) => {
    const filterValue = e.target.value.toLowerCase();  // Get the lowercase value for case-insensitive matching
    console.log('Filtering employees with value:', filterValue);
    
    // Filter employees whose name matches the filter value
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(filterValue)
    );
    console.log('Filtered Employees:', records);

    // Update the filtered employees state with the search results
    setFilteredEmployees(records);
  };

  return (
    <div className='p-6'>
      {/* Heading for the page */}
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>

      {/* Search input and "Add New Employee" button */}
      <div className="flex justify-between items-center my-4">
        <input
          type="text"
          placeholder="Search By Name"
          className="px-4 py-0.5 border"
          onChange={handleFilter}  // Call handleFilter function on input change
        />
        
        {/* Link to the page for adding a new employee */}
        <Link
          to="/admin-dashboard/add-employee"
          className="px-4 py-1 bg-teal-600 rounded text-white"
        >
          Add New Employee
        </Link>
      </div>

      {/* Employee table */}
      <div className="mt-6">
        {empLoading ? (  // Display loading message if employee data is being fetched
          <div>Loading...</div>
        ) : (
          <DataTable columns={columns} data={filteredEmployee} pagination />  // Render the data table with filtered employee data
        )}
      </div>
    </div>
  );
};

export default List;
