import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Detail = () => {
    // Extract the idea ID from the URL params
    const { id } = useParams();
    const [idea, setIdea] = useState(null); // State to store the fetched idea details
    const [remark, setRemark] = useState(''); // State for the remark input
    const navigate = useNavigate();

    // Fetch the idea details when the component is mounted or the ID changes
    useEffect(() => {
        const fetchIdea = async () => {
            try {
                // Fetch idea details from the server using the idea ID
                const response = await axios.get(
                    `http://localhost:3000/api/idea/detail/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`, // Use stored token for authentication
                        },
                    }
                );

                // If the response is successful, store the idea details in state
                if (response.data.success) {
                    setIdea(response.data.idea);
                }
            } catch (error) {
                // Handle error if the API call fails
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchIdea(); // Call the function to fetch idea details
    }, [id]); // Run this effect when the ID changes

    // Change the status of the idea (approve or reject)
    const changeStatus = async (status) => {
        try {
            // Send a PUT request to update the idea status
            const response = await axios.put(
                `http://localhost:3000/api/idea/${id}`,
                { status, remarks: remark }, // Include status and remarks
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`, // Include the token for authentication
                    },
                }
            );

            // If the status update is successful, navigate back to the idea list
            if (response.data.success) {
                navigate('/admin-dashboard/ideas');
            }
        } catch (error) {
            // Handle error if the status update fails
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <>
            {idea ? ( // If idea details are fetched successfully, render them
               <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                   <h2 className="text-2xl font-bold mb-8 text-center">Idea Details</h2>
                   
                   <div className="flex flex-col space-y-5">
                       {/* Display the details of the idea */}
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Name:</p>
                           <p className="font-medium">{idea.employeeId.userId.name}</p>
                       </div>
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Employee ID:</p>
                           <p className="font-medium">{idea.employeeId.employeeId}</p>
                       </div>
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Department:</p>
                           <p className="font-medium">{idea.employeeId.department.dep_name}</p>
                       </div>
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Idea Title:</p>
                           <p className="font-medium">{idea.title}</p>
                       </div>
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Idea Description:</p>
                           <p className="font-medium">{idea.description}</p>
                       </div>
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Idea Impact:</p>
                           <p className="font-medium">{idea.impact}</p>
                       </div>
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Applied Date:</p>
                           <p className="font-medium">{new Date(idea.appliedDate).toLocaleDateString()}</p>
                       </div>
                       <div className="flex space-x-3">
                           <p className="text-lg font-bold">Status:</p>
                           <p className="font-medium">{idea.status}</p> {/* Display current idea status */}
                       </div>
                       {idea.remarks && ( // Display remarks if available
                           <div className="flex space-x-3">
                               <p className="text-lg font-bold">Remarks:</p>
                               <p className="font-medium">{idea.remarks}</p> {/* Display remarks */}
                           </div>
                       )}
                   </div>

                   {/* Show action buttons only if the status is Pending */}
                   {idea.status === "Pending" && (
                       <>
                           <h3 className="mt-6 text-lg font-bold">Action</h3>
                           <textarea 
                               value={remark} 
                               onChange={(e) => setRemark(e.target.value)} // Update remark state on input change
                               placeholder="Add remarks here..."
                               className="border rounded p-2 w-full"
                               rows="4"
                           />
                           <div className="flex space-x-2 mt-2">
                               {/* Buttons to approve or reject the idea */}
                               <button
                                   className="px-4 py-2 bg-teal-300 hover:bg-teal-400"
                                   onClick={() => changeStatus("Approved")}
                               >
                                   Approve
                               </button>
                               <button
                                   className="px-4 py-2 bg-red-300 hover:bg-red-400"
                                   onClick={() => changeStatus("Rejected")}
                               >
                                   Reject
                               </button>
                           </div>
                       </>
                   )}
               </div>
            ) : (
                <div>Loading...</div> // Display loading text while fetching data
            )}
        </>
    );
};

export default Detail;
