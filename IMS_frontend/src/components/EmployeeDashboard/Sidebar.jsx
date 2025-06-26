// Importing necessary components and icons from libraries
import { NavLink } from 'react-router-dom';  // Importing NavLink for navigation with active link styling
import { FaBuilding, FaCogs, FaTachometerAlt, FaUsers } from 'react-icons/fa';  // Importing icons from react-icons for visual representation
import { useAuth } from '../../context/authContext';  // Importing useAuth to get the current user's data

const Sidebar = () => {
    const { user } = useAuth();  // Using the useAuth hook to get the current authenticated user's information

  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      {/* Sidebar header */}
      <div className='bg-teal-600 h-12 flex items-center justify-center'>
        <h3 className='text-2xl text-center font-pacific'>Idea Management</h3> {/* Title of the sidebar */}
      </div>

      <div className="px-4">
        {/* Dashboard Link */}
        <NavLink 
          to="/employee-dashboard"  // Navigating to the dashboard route
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}  // Conditional className for active link styling
          end
        >
          <FaTachometerAlt />  {/* Dashboard icon */}
          <span>Dashboard</span>  {/* Dashboard link text */}
        </NavLink>

        {/* My Profile Link */}
        <NavLink 
          to={`/employee-dashboard/profile/${user._id}`}  // Navigating to the user's profile page based on user ID
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}  // Conditional className for active link styling
        >
          <FaUsers />  {/* Profile icon */}
          <span>My Profile</span>  {/* Profile link text */}
        </NavLink>

        {/* Ideas Link */}
        <NavLink 
          to={`/employee-dashboard/ideas/${user._id}`}  // Navigating to the user's ideas page based on user ID
          className={({ isActive }) => `${isActive ? "bg-teal-500" : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}  // Conditional className for active link styling
        >
          <FaBuilding />  {/* Ideas icon */}
          <span>Ideas</span>  {/* Ideas link text */}
        </NavLink>

        {/* Settings Link */}
        <NavLink 
          to="/employee-dashboard/setting"  // Navigating to the settings page
          className="flex items-center space-x-4 block py-2.5 px-4 rounded"  // Styling for the link
        >
          <FaCogs />  {/* Settings icon */}
          <span>Settings</span>  {/* Settings link text */}
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
