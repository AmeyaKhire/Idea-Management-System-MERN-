// Import the necessary modules from React and other files
// import { StrictMode } from 'react' // Uncomment this for StrictMode during development (optional)
import { createRoot } from 'react-dom/client'; // Create root for rendering the app in the DOM
import './index.css';  // Import Tailwind CSS for styling
import App from './App.jsx';  // Import the main App component
import AuthContext from './context/authContext.jsx';  // Import the AuthContext for authentication handling

// Render the App component inside the root element
createRoot(document.getElementById('root')).render(
  // Wrap the App component inside AuthContext to provide authentication context
  <AuthContext>
    <App />  {/* Main application component */}
  </AuthContext>,
);
