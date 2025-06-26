// Importing necessary hooks and components
// useAuth is a custom hook to access authentication state
// Navigate is used to redirect the user if not authenticated

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth(); // Destructure user and loading states from the auth context

    // If the authentication state is still loading, show a loading message
    if (loading) {
        return <div>Loading ....</div>;
    }

    // If the user is authenticated (user exists), render the children (the protected route component)
    // If the user is not authenticated, redirect them to the login page
    return user ? children : <Navigate to="/login" />;
};

export default PrivateRoutes; // Export the PrivateRoutes component for use in other parts of the app
