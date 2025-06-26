import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const List = () => {
  // State to store the list of ideas
  const [ideas, setIdeas] = useState(null);
  // Extract the department ID from URL parameters
  const { id } = useParams();
  // Get the current user's data from the context
  const { user } = useAuth();

  // Function to fetch ideas from the API
  const fetchIdeas = async () => {
    try {
      // Send GET request to fetch ideas for the department ID
      const response = await axios.get(`http://localhost:3000/api/idea/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Include authorization token
        },
      });

      // If request is successful, set the ideas data in state
      if (response.data.success) {
        setIdeas(response.data.ideas);
      }
    } catch (error) {
      // Handle error if the request fails
      if (error.response && !error.response.data.success) {
        alert(error.message);
      }
    }
  };

  // Fetch the ideas when the component mounts
  useEffect(() => {
    fetchIdeas();
  }, []); // Empty dependency array means this runs once when the component is mounted

  let sno = 1; // Initialize serial number for displaying ideas in the table

  // Show loading message while the ideas data is being fetched
  if (!ideas) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      {/* Header section with the title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold">Manage Ideas</h3>
      </div>

      {/* Button to add new idea only visible to employees */}
      <div className="flex justify-between items-center my-4">
        {user.role === "employee" && (
          <Link
            to="/employee-dashboard/add-idea"
            className="px-4 py-1 bg-teal-600 rounded text-white"
          >
            Add New Idea
          </Link>
        )}
      </div>

      {/* Table displaying ideas */}
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
          <tr>
            <th className="px-6 py-3">SNo</th> {/* Serial Number */}
            <th className="px-6 py-3">Idea Title</th>
            <th className="px-6 py-3">Idea Description</th>
            <th className="px-6 py-3">Idea Impact</th>
            <th className="px-6 py-3">Applied Date</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {/* Loop through the list of ideas and display each one */}
          {ideas.map((idea) => (
            <tr
              key={idea._id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-3">{sno++}</td> {/* Display serial number */}
              <td className="px-6 py-3">{idea.title}</td> {/* Display idea title */}
              <td className="px-6 py-3">{idea.description}</td> {/* Display idea description */}
              <td className="px-6 py-3">{idea.impact}</td> {/* Display idea impact */}
              <td className="px-6 py-3">{new Date(idea.appliedDate).toLocaleDateString()}</td> {/* Format applied date */}
              <td className="px-6 py-3">{idea.status}</td> {/* Display idea status */}
              <td className="px-6 py-3" style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {idea.remarks || "N/A"} {/* Display remarks or "N/A" if not available */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
