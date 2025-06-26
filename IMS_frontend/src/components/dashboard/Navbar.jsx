// Import necessary dependencies
// import React from 'react' (Commented out as it's not required in modern React versions)
import { useAuth } from '../../context/authContext'; // Import the custom authentication context

// Navbar component definition
const Navbar = () => {
    // Destructure the user object and logout function from the authentication context
    const { user, logout } = useAuth();

    return (
        // Navbar container with flex layout for alignment
        <div className='flex items-center text-white justify-between h-12 bg-teal-600 px-5'>
            {/* Display a welcome message with the user's name */}
            <p>Welcome {user.name}</p>
            {/* Logout button to trigger the logout function */}
            <button 
                className='px-4 py-1 bg-teal-700 hover:bg-teal-800' // Button styling with hover effect
                onClick={logout} // Call logout function when button is clicked
            >
                Logout
            </button>
        </div>
    );
};

export default Navbar; // Export the Navbar component
