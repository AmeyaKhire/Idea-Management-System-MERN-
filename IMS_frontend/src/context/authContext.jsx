import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useContext } from "react";

// Create a context for user authentication
const userContext = createContext();

const AuthContext = ({ children }) => {
    // State to store user data (initially null)
    const [user, setUser] = useState(null);
    // State to track loading state (true until user verification is complete)
    const [loading, setLoading] = useState(true);

    // useEffect hook to verify the user's authentication when the component mounts
    useEffect(() => {
        const verifyUser = async () => {
            try {
                // Get the token from localStorage
                const token = localStorage.getItem('token');
                
                // If token exists, make an API call to verify the user
                if (token) {
                    const response = await axios.get(
                        'http://localhost:3000/api/auth/verify', {
                        headers: {
                            // Send the token in the Authorization header
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    console.log(response);
                    
                    // If the response is successful, set the user in the state
                    if (response.data.success) {
                        setUser(response.data.user);
                    }
                } else {
                    // If no token is found, set user as null
                    setUser(null);
                    setLoading(false); // Stop loading when no token is found
                }
            } catch (error) {
                console.log(error);
                
                // If the response indicates failure, set user as null
                if (error.response && !error.response.data.success) {
                    setUser(null);
                }
            } finally {
                // Set loading state to false after the verification process
                setLoading(false);
            }
        };

        // Call the verifyUser function
        verifyUser();
    }, []); // Empty dependency array ensures this effect runs only once when the component mounts

    // Function to log the user in by setting the user data in the state
    const login = (user) => {
        setUser(user);
    };

    // Function to log the user out by clearing user data and removing the token from localStorage
    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    return (
        // Provide the user data and authentication functions to the context
        <userContext.Provider value={{ user, login, logout, loading }}>
            {children} {/* Render child components that consume this context */}
        </userContext.Provider>
    );
};

// Custom hook to use authentication context in other components
export const useAuth = () => useContext(userContext);

// Export AuthContext component to wrap around the app's components
export default AuthContext;
