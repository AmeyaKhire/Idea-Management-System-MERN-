// Importing necessary components and icons
import React, { useEffect, useState } from 'react';
import { FaUser, FaFileAlt, FaCheckCircle, FaHourglassHalf, FaTimesCircle } from "react-icons/fa";  // Importing icons for visualization
import { useAuth } from "../../context/authContext";  // Importing the useAuth hook to access the authenticated user's data
import axios from 'axios';  // Importing axios for making HTTP requests
import SummaryCard from '../dashboard/SummaryCard';  // Importing the SummaryCard component to display the summary data

const Summary = () => {
    const { user } = useAuth();  // Getting the current authenticated user's data
    const [ideaSummary, setIdeaSummary] = useState(null);  // State to store the idea summary fetched from the API

    useEffect(() => {
        // Function to fetch the idea summary for the current user
        const fetchIdeaSummary = async () => {
            // Check if user ID is available
            if (!user || !user._id) {
                console.error("User ID is not available");
                return;  // Exit the function if user ID is missing
            }

            try {
                // Making an API request to get the user's idea summary
                console.log("Fetching idea summary for user:", user._id);
                const response = await axios.get(`http://localhost:3000/api/dashboard/employee-summary/${user._id}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`  // Authorization header with the token from local storage
                    }
                });
                console.log("API Response:", response.data);

                // Check if the API call was successful and set the idea summary
                if (response.data.success) {
                    setIdeaSummary(response.data.ideaSummary);  // Storing the summary data in the state
                } else {
                    alert("Failed to fetch idea summary.");  // Display an alert if the API response indicates failure
                }
            } catch (error) {
                // Catching any error that occurs during the API request
                console.error("Error fetching idea summary:", error);
                alert("Failed to fetch idea summary. Please try again later.");  // Displaying an error alert
            }
        };

        fetchIdeaSummary();  // Call the function to fetch the idea summary when the component is mounted
    }, [user]);  // Dependency array, ensuring the effect runs when `user` changes

    // Display loading message if ideaSummary is not available
    if (!ideaSummary) {
        return <div>Loading...</div>;
    }

    return (
        <div className='p-6'>
            {/* User Welcome Section */}
            <div className="rounded flex bg-white mb-4">
                <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4`}>
                    <FaUser />  {/* Icon representing the user */}
                </div>
                <div className="pl-4 py-1">
                    <p className="text-lg font-semibold">Welcome Back</p>  {/* Welcome message */}
                    <p className="text-xl font-bold">{user.name}</p>  {/* Displaying the user's name */}
                </div>
            </div>

            {/* Idea Summary Section */}
            <h3 className="text-lg font-semibold">Your Idea Summary</h3>  {/* Heading for the Idea Summary */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
                {/* Displaying individual idea summary cards for each category */}
                <SummaryCard icon={<FaFileAlt />} text="Ideas Applied" number={ideaSummary.appliedFor} color="bg-teal-600" />
                <SummaryCard icon={<FaCheckCircle />} text="Ideas Approved" number={ideaSummary.approved} color="bg-green-600" />
                <SummaryCard icon={<FaHourglassHalf />} text="Ideas Pending" number={ideaSummary.pending} color="bg-yellow-600" />
                <SummaryCard icon={<FaTimesCircle />} text="Ideas Rejected" number={ideaSummary.rejected} color="bg-red-600" />
            </div>
        </div>
    );
};

export default Summary;
