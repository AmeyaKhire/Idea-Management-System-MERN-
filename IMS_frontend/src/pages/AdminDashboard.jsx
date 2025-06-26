import { useAuth } from "../context/authContext"  // Importing the custom hook to access authentication context
import AdminSidebar from "../components/dashboard/AdminSidebar"  // Importing the sidebar component for the admin dashboard
import Navbar from "../components/dashboard/Navbar"  // Importing the navbar component for the admin dashboard
import AdminSummary from "../components/dashboard/AdminSummary"  // Importing the summary component for the admin dashboard (currently not used)
import { Outlet } from "react-router-dom"  // Importing Outlet for rendering child routes within the dashboard

const AdminDashboard = () => {
  const { user } = useAuth();  // Access the user data from the authentication context

  return (
    <div className='flex'>
      {/* Admin Sidebar */}
      <AdminSidebar />
      
      <div className='flex-1 ml-64 bg-gray-100 h-screen'>
        {/* Admin Navbar */}
        <Navbar />
        
        {/* Render child routes inside this component */}
        {/* The Outlet component allows nested routes to render their components inside the dashboard layout */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
