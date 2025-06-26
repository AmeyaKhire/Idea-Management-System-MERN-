


import { useAuth } from '../context/authContext'; 
import { Navigate } from 'react-router-dom';

const RoleBaseRoutes = ({ children, requiredRole }) => {
    const { user, loading } = useAuth(); // Destructure user info and loading state from auth context

    // If authentication state is still loading, show a loading message
    if (loading) {
        return <div>Loading...</div>; // Display while authentication status is being checked
    }

    // If user is not authenticated, redirect to login page
    if (!user) {
        return <Navigate to="/login" />; // Redirect unauthenticated users to the login page
    }

    // Check if the user has the required role (it can be a string or an array of roles)
    if (
        (Array.isArray(requiredRole) && requiredRole.includes(user.role)) || // If requiredRole is an array, check if user's role is in the list
        (typeof requiredRole === 'string' && requiredRole === user.role) // If requiredRole is a single string, check if it matches the user's role
    ) {
        return children; // If the user has the required role, render the protected component (children)
    }

    // If the user doesn't have the required role, redirect them to an unauthorized page
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized error page if the user doesn't have the required role
};

export default RoleBaseRoutes; // Export the RoleBaseRoutes component for use in other parts of the app