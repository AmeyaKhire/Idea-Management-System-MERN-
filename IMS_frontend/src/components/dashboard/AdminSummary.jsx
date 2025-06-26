// Import required libraries and components
import { useEffect, useState } from 'react'; // React hooks for managing state and side effects
import SummaryCard from './SummaryCard'; // Component to display individual summary cards
import { FaBuilding, FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUsers } from 'react-icons/fa'; // Icons for visual representation
import axios from 'axios'; // For making API calls

// AdminSummary component to display dashboard overview
const AdminSummary = () => {
  const [summary, setSummary] = useState(null); // State to store summary data

  // useEffect to fetch dashboard summary data from the server when the component loads
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        // API call to fetch summary data
        const response = await axios.get('http://localhost:3000/api/dashboard/summary', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}` // Add token for authentication
          }
        });
        console.log(response.data); // Log the fetched data for debugging
        setSummary(response.data); // Update state with fetched data
      } catch (error) {
        if (error.response) {
          alert(error.response.data.error); // Display error message if available
        }
        console.log(error.message); // Log error message
      }
    };
    fetchSummary(); // Call the fetchSummary function
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  // Show loading state while data is being fetched
  if (!summary) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-6'>
      {/* Dashboard header */}
      <h3 className='text-2xl font-bold'>Dashboard Overview</h3>
      
      {/* Summary cards for employees and departments */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-6'>
        <SummaryCard icon={<FaUsers />} text="Total Employees" number={summary.totalEmployees} color="bg-teal-600" />
        <SummaryCard icon={<FaBuilding />} text="Total Departments" number={summary.totalDepartments} color="bg-yellow-600" />
      </div>

      {/* Idea details section */}
      <div className='mt-12'>
        <h4 className="text-center text-2xl font-bold">Idea Details</h4>

        {/* Summary cards for idea statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SummaryCard icon={<FaFileAlt />} text="Employees Applied for Ideas" number={summary.ideaSummary.appliedFor} color="bg-teal-600" />
          <SummaryCard icon={<FaFileAlt />} text="Total Ideas Submitted" number={summary.ideaSummary.totalIdeas} color="bg-blue-600" />
          <SummaryCard icon={<FaCheckCircle />} text="Ideas Approved" number={summary.ideaSummary.approved} color="bg-green-600" />
          <SummaryCard icon={<FaHourglassHalf />} text="Ideas Pending" number={summary.ideaSummary.pending} color="bg-yellow-600" />
          <SummaryCard icon={<FaTimesCircle />} text="Ideas Rejected" number={summary.ideaSummary.rejected} color="bg-red-600" />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
