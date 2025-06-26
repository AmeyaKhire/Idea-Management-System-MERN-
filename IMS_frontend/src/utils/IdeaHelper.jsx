import { useNavigate } from "react-router-dom";

// Define the columns for the Ideas table with various fields and customized formatting
export const columns = [
    {
        name: "S No", // Column for serial number (index)
        selector: (row) => row.sno, // Access serial number from row data
        width: "60px", // Set the width of this column
    },
    {
        name: "Emp ID", // Column for employee ID
        selector: (row) => row.employeeId, // Access employee ID from row data
        width: "120px", // Set the width of this column
    },
    {
        name: "Name", // Column for employee's name
        selector: (row) => (
            <div style={{ maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {row.name || "N/A"} {/* Display employee name, or "N/A" if missing */}
            </div>
        ),
        width: "140px", // Set the width of this column
    },
    {
        name: "Department", // Column for department name
        selector: (row) => row.department, // Access department name from row data
        width: "170px", // Set the width of this column
    },
    {
        name: "Idea Title", // Column for idea title
        selector: (row) => (
            <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {row.title || "N/A"} {/* Display idea title, or "N/A" if missing */}
            </div>
        ),
        width: "200px", // Set the width of this column
    },
    // Uncomment and modify if idea description and impact are needed
    // {
    //     name: "Idea Description", // Column for idea description
    //     selector: (row) => row.description, // Access idea description from row data
    //     width: "300px", // Set the width of this column
    // },
    // {
    //     name: "Idea Impact", // Column for idea impact
    //     selector: (row) => row.impact, // Access idea impact from row data
    //     width: "150px", // Set the width of this column
    // },
    {
        name: "Applied Date", // Column for applied date of the idea
        selector: (row) => row.appliedDate, // Access applied date from row data
        width: "130px", // Set the width of this column
    },
    {
        name: "Status", // Column for idea status (e.g., pending, approved)
        selector: (row) => row.status, // Access status from row data
        width: "110px", // Set the width of this column
    },
    {
        name: "Remarks", // Column for remarks on the idea
        selector: (row) => row.remarks, // Access remarks from row data
        width: "200px", // Set the width of this column
        cell: row => (
            <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
                {row.remarks || "N/A"} {/* Display remarks, or "N/A" if missing */}
            </div>
        ),
    },
    {
        name: "Action", // Column for actions (e.g., View, Edit, etc.)
        selector: (row) => row.action, // Access actions from row data
        center: true, // Center-align the actions column
    },
];

// IdeaButtons component to display action buttons (e.g., View button)
export const IdeaButtons = ({ Id }) => {
    const navigate = useNavigate(); // useNavigate hook to handle navigation programmatically

    // Function to handle "View" button click, which navigates to the idea's detail page
    const handleView = (id) => {
        navigate(`/admin-dashboard/ideas/${id}`); // Navigate to the detailed view of the idea
    };

    return (
        <button
            className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600" // Style the View button
            onClick={() => handleView(Id)} // Call handleView when button is clicked
        >
            View {/* Button text */}
        </button>
    );
};
