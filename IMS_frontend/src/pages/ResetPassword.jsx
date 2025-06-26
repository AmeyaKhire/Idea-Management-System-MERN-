// src/components/ResetPassword.jsx
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
    // State variables to store the new password, confirm password, and message
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    
    // Extract the token from the URL parameters using useParams hook
    const { token } = useParams(); 
    
    // useNavigate hook to programmatically navigate after success
    const navigate = useNavigate();

    // Handle the form submission for password reset
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the new password and confirm password match
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        try {
            // Make an API call to reset the password using the token from the URL
            const response = await axios.post(
                `http://localhost:3000/api/auth/reset-password/${token}`,
                { password: newPassword }
            );

            // If the password reset is successful, display a success message and redirect
            if (response.data.success) {
                setMessage("Your password has been reset successfully.");
                setTimeout(() => {
                    navigate('/login'); // Redirect to login after successful reset
                }, 2000);
            } else {
                // If there is an error, show the error message from the response
                setMessage(response.data.error || "Failed to reset password.");
            }
        } catch (error) {
            // Log any error and display a generic error message
            console.error(error); // Log error for debugging
            setMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-500 to-gray-200 space-y-6 px-4">
            <h2 className="font-sevillana text-4xl text-white shadow-lg">
                Reset Password
            </h2>

            <div className="border shadow-lg rounded-lg p-8 w-96 bg-white">
                <form onSubmit={handleSubmit}>
                    {/* Input field for new password */}
                    <div className="mb-5">
                        <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-2">New Password</label>
                        <input
                            type="password"
                            id="newPassword"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} // Update state on change
                            required
                        />
                    </div>

                    {/* Input field for confirm password */}
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)} // Update state on change
                            required
                        />
                    </div>

                    {/* Submit button to reset password */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition duration-200"
                    >
                        Reset Password
                    </button>
                </form>

                {/* Display success or error message after form submission */}
                {message && (
                    <p className={`mt-4 ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
