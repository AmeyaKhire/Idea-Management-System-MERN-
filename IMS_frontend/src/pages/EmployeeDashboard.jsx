// Importing necessary components for the employee dashboard layout
import Sidebar from "../components/EmployeeDashboard/Sidebar"  // Sidebar component for employee dashboard
import { Outlet } from 'react-router-dom'  // Importing Outlet for rendering child routes
import Navbar from '../components/dashboard/Navbar'  // Navbar component for employee dashboard

const EmployeeDashboard = () => {

    return (
      <div className='flex'>  {/* Flex container for the layout */}
        {/* Sidebar for navigation */}
        <Sidebar />
        
        {/* Main content area */}
        <div className='flex-1 ml-64 bg-gray-100 h-screen'>
          {/* Navbar for the top of the dashboard */}
          <Navbar />
          
          {/* The Outlet component renders child routes in this space */}
          {/* It allows for nested routes to be rendered inside the main content area */}
          <Outlet />
        </div>
      </div>
  )
}

export default EmployeeDashboard;  // Exporting the component to be used in other parts of the app
