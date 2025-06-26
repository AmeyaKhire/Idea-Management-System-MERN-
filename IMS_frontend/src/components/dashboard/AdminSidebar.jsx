// Import required libraries and components
import { NavLink } from 'react-router-dom'; // For navigation links
import { FaBuilding, FaCogs, FaTachometerAlt, FaUsers } from 'react-icons/fa'; // For icons

// AdminSidebar component to render the admin panel sidebar
const AdminSidebar = () => {
  return (
    // Sidebar container with fixed position and styling
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      
      {/* Header section of the sidebar */}
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Idea Management</h3>
      </div>
      
      {/* Navigation links container */}
      <div className="px-4">
        
        {/* Dashboard navigation link */}
        <NavLink 
          to="/admin-dashboard" 
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}
          end>
          <FaTachometerAlt /> {/* Icon for Dashboard */}
          <span>Dashboard</span>
        </NavLink>

        {/* Employees navigation link */}
        <NavLink 
          to="/admin-dashboard/employees" 
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaUsers /> {/* Icon for Employees */}
          <span>Employees</span>
        </NavLink>

        {/* Departments navigation link */}
        <NavLink 
          to="/admin-dashboard/departments" 
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaBuilding /> {/* Icon for Departments */}
          <span>Department</span>
        </NavLink>

        {/* Ideas navigation link */}
        <NavLink 
          to="/admin-dashboard/ideas" 
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaBuilding /> {/* Icon for Ideas */}
          <span>Ideas</span>
        </NavLink>

        {/* Settings navigation link */}
        <NavLink 
          to="/admin-dashboard/setting" 
          className={({ isActive }) => `${isActive ? "bg-teal-500 " : " "}flex items-center space-x-4 block py-2.5 px-4 rounded`}>
          <FaCogs /> {/* Icon for Settings */}
          <span>Settings</span>
        </NavLink>

      </div>
    </div>
  );
};

// Export the AdminSidebar component for use in other parts of the application
export default AdminSidebar;
