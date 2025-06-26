
// import React from 'react'

// Define the SummaryCard component
// Accepts props: icon, text, number, and color
const SummaryCard = ({ icon, text, number, color }) => {
  return (
    // Main container for the summary card with a white background and rounded corners
    <div className="rounded flex bg-white">
        {/* Icon section */}
        {/* Apply dynamic background color using the 'color' prop */}
        <div className={`text-3xl flex justify-center items-center ${color} text-white px-4`}>
            {icon} {/* Display the icon passed as a prop */}
        </div>

        {/* Content section */}
        <div className="pl-4 py-1">
            {/* Display the text passed as a prop */}
            <p className="text-lg font-semibold">{text}</p>
            {/* Display the number passed as a prop */}
            <p className="text-xl font-bold">{number}</p>
        </div>
    </div>
  );
};

// Export the SummaryCard component for use in other files
export default SummaryCard;
