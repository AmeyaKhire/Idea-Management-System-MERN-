import axios from "axios";  // Importing axios for API requests
import { useState, useEffect } from "react";  // Importing useState and useEffect hooks
import { useAuth } from "../context/authContext";  // Importing custom auth context for login functionality
import { useNavigate, Link } from "react-router-dom";  // Importing navigation hooks and Link for routing

const Login = () => {
    // State variables for login form and reset password functionality
    const [email, setEmail] = useState('');  // State for email input
    const [password, setPassword] = useState('');  // State for password input
    const [error, setError] = useState(null);  // State for handling login errors
    const [resetEmail, setResetEmail] = useState('');  // State for email input in forgot password
    const [resetMessage, setResetMessage] = useState('');  // State for reset password message
    const [showResetField, setShowResetField] = useState(false);  // State for toggling reset field visibility
    const [rememberMe, setRememberMe] = useState(false);  // State for Remember Me checkbox
    const { login } = useAuth();  // Extracting login function from the auth context
    const navigate = useNavigate();  // Hook for programmatic navigation

    // Effect hook to check if there is a saved email for 'Remember Me'
    useEffect(() => {
        const savedEmail = localStorage.getItem('rememberMeEmail');
        if (savedEmail) {
            setEmail(savedEmail);  // Pre-fill email if saved in localStorage
            setRememberMe(true);  // Set Remember Me to true
        }
    }, []);  // Empty dependency array means this runs once when the component mounts

    // Handle login form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevent default form submission

        try {
            // Make a POST request to the login API with email and password
            const response = await axios.post(
                "http://localhost:3000/api/auth/login",
                { email, password }
            );

            if (response.data.success) {
                login(response.data.user);  // Call login function from context to set user state
                localStorage.setItem("token", response.data.token);  // Save token in localStorage

                // Save email in localStorage if 'Remember Me' is checked
                if (rememberMe) {
                    localStorage.setItem('rememberMeEmail', email);
                } else {
                    localStorage.removeItem('rememberMeEmail');  // Clear saved email if 'Remember Me' is not checked
                }

                // Navigate to respective dashboard based on user role
                if (response.data.user.role === "admin") {
                    navigate('/admin-dashboard');
                } else {
                    navigate("/employee-dashboard");
                }
            }
        } catch (error) {
            // Handle errors in login request
            if (error.response && !error.response.data.success) {
                setError(error.response.data.error || "Invalid credentials");
            } else {
                setError("Server Error");
            }
        }
    };

    // Handle forgot password request
    const handleForgotPassword = async () => {
        if (!resetEmail) {
            setResetMessage("Please enter your email address.");
            return;
        }

        try {
            // Make a POST request to the forgot-password API with reset email
            const response = await axios.post(
                "http://localhost:3000/api/auth/forgot-password", 
                { email: resetEmail }
            );
            if (response.data.success) {
                setResetMessage("A password reset link has been sent to your email.");
                setResetEmail('');  // Clear reset email field
                setShowResetField(false);  // Hide reset email field after submission
            } else {
                setResetMessage("Failed to send reset link. Please check your email.");
            }
        } catch (error) {
            setResetMessage("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="flex flex-col items-center h-screen justify-center bg-gradient-to-b from-teal-500 to-gray-200 space-y-6 px-4">
            <h2 className="font-sevillana text-4xl text-white shadow-lg">
                Idea Management System
            </h2>

            <div className="border shadow-lg rounded-lg p-8 w-96 bg-white">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>
                
                {/* Error message if login fails */}
                {error && (
                    <div className="text-red-500 mb-4">
                        {error}
                    </div>
                )}

                {/* Link to Sign Up page */}
                <div className="mb-4 text-center">
                    <span>Don't have an account? </span>
                    <Link to="/signup" className="text-teal-600 hover:underline">Sign Up</Link>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-5">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  // Update email state on change
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-5">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="******"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}  // Update password state on change
                            required
                        />
                    </div>

                    {/* Remember Me & Forgot Password link */}
                    <div className="flex items-center justify-between mb-6">
                        <label className="inline-flex items-center">
                            <input 
                                type="checkbox" 
                                className="form-checkbox text-teal-600" 
                                checked={rememberMe} 
                                onChange={(e) => setRememberMe(e.target.checked)}  // Update rememberMe state on checkbox change
                            />
                            <span className="ml-2 text-gray-700">Remember me</span>
                        </label>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowResetField(!showResetField);  // Toggle reset password field visibility
                            }}
                            className="text-teal-600 hover:underline"
                        >
                            Forgot password?
                        </button>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* Forgot Password Section */}
                {showResetField && (
                    <div className="mt-6">
                        <label htmlFor="resetEmail" className="block text-gray-700 font-medium mb-2">
                            Enter your email for password reset:
                        </label>
                        <input
                            type="email"
                            id="resetEmail"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                            placeholder="Enter Email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}  // Update reset email state on change
                        />
                        <button
                            onClick={handleForgotPassword}
                            className="mt-3 w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded-lg font-medium transition duration-200"
                        >
                            Send Reset Link
                        </button>
                    </div>
                )}

                {/* Reset Message */}
                {resetMessage && (
                    <p className={`mt-4 text-center ${resetMessage.includes('sent') ? 'text-green-500' : 'text-red-500'}`}>
                        {resetMessage}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Login;  // Export the Login component to be used in other parts of the app
