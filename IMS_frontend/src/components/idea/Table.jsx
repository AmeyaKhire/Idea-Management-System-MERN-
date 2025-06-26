import React, { useEffect, useState } from "react";
import { IdeaButtons } from "../../utils/IdeaHelper"; // Import IdeaButtons component
import axios from "axios";
import DataTable from "react-data-table-component"; // Import DataTable for displaying data in a tabular format
import { columns } from "../../utils/IdeaHelper"; // Import columns configuration for the DataTable

const Table = () => {
    // State to store all the fetched ideas
    const [ideas, setIdeas] = useState(null);
    // State to store filtered ideas based on search or button click
    const [filteredIdeas, setFilteredIdeas] = useState(null);

    // Function to fetch ideas from the backend API
    const fetchIdeas = async () => {
        try {
            // Send a GET request to fetch ideas with the Authorization token
            const response = await axios.get("http://localhost:3000/api/idea", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token for authentication
                },
            });

            // If the request is successful, process the ideas data
            if (response.data.success) {
                let sno = 1; // Initialize serial number for the ideas
                // Map the response data to the format needed for the table
                const data = response.data.ideas.map((idea) => ({
                    _id: idea._id,
                    sno: sno++, // Increment serial number for each idea
                    employeeId: idea.employeeId.employeeId, // Get employee ID
                    name: idea.employeeId.userId.name, // Get employee name
                    department: idea.employeeId.department.dep_name, // Get department name
                    title: idea.title, // Idea title
                    description: idea.description, // Idea description
                    impact: idea.impact, // Idea impact
                    appliedDate: new Date(idea.appliedDate).toLocaleDateString(), // Format the applied date
                    status: idea.status, // Idea status
                    remarks: idea.remarks || "N/A", // Display "N/A" if remarks are not available
                    action: <IdeaButtons Id={idea._id} />, // Add action buttons for each idea
                }));
                // Set ideas data and also set it as filteredIdeas initially
                setIdeas(data);
                setFilteredIdeas(data);
            }
        } catch (error) {
            // Handle error if the request fails
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error); // Show error message from the server
            }
        }
    };

    // Fetch ideas when the component is mounted
    useEffect(() => {
        fetchIdeas();
    }, []); // Empty dependency array means this effect runs once after the initial render

    // Function to filter ideas based on employee ID input
    const filterByInput = (e) => {
        const data = ideas.filter(idea => 
            idea.employeeId
            .toLowerCase() // Convert input to lowercase for case-insensitive matching
            .includes(e.target.value.toLowerCase()) // Compare with input value
        );
        setFilteredIdeas(data); // Update filteredIdeas state with the filtered data
    };

    // Function to filter ideas based on the selected status button
    const filterByButton = (status) => {
        const data = ideas.filter(idea => 
            idea.status
            .toLowerCase() // Convert status to lowercase for case-insensitive matching
            .includes(status.toLowerCase()) // Compare with the status passed to the function
        );
        setFilteredIdeas(data); // Update filteredIdeas state with the filtered data
    };

    return (
        <>
            {/* Conditionally render content based on whether filteredIdeas is available */}
            {filteredIdeas ? (
                <div className="p-6">
                    {/* Page header */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Ideas</h3>
                    </div>
                    {/* Search input and buttons for filtering ideas */}
                    <div className="flex justify-between items-center my-4">
                        {/* Input to search by Employee ID */}
                        <input
                            type="text"
                            placeholder="Search By Emp Id"
                            className="px-4 py-0.5 border"
                            onChange={filterByInput} // Call filterByInput when the user types in the input field
                        />
                        {/* Buttons to filter ideas based on status */}
                        <div className="space-x-3">
                            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                            onClick={() => filterByButton("Pending")}>
                                Pending
                            </button>
                            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                             onClick={() => filterByButton("Approved")}>
                                Approved
                            </button>
                            <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700"
                             onClick={() => filterByButton("Rejected")}>
                                Rejected
                            </button>
                        </div>
                    </div>
                    {/* Display the data table */}
                    <div className="mt-3">
                    <DataTable columns={columns} data={filteredIdeas} pagination />
                    </div>
                </div>
            ) : (
                // Display loading message while data is being fetched
                <div>Loading ...</div>
            )}
        </>
    );
};

export default Table;
