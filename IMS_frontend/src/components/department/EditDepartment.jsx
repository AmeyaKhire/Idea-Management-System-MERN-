import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditDepartment = () => {
    const {id} = useParams() // Extracting the department ID from the URL parameters
    const [department, setDepartment] = useState([]) // State to hold the department details
    const [depLoading, setDepLoading] = useState(false) // State to track loading status
    const navigate = useNavigate() // Hook to navigate programmatically

    useEffect(() => {
        const fetchDepartments = async () => {
          setDepLoading(true) // Setting the loading state to true before API call
          try {
            const response = await axios.get(
                `http://localhost:3000/api/department/${id}`, // API call to fetch department by ID
                {
                headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Adding authorization header with token
              },
            });
    console.log(response.data) // Logging the response data for debugging
            if (response.data.success) {
             setDepartment(response.data.department) // Updating state with fetched department data
            }
          } catch (error) {
           if(error.response && !error.response.data.success) {
            alert(error.response.data.error) // Alerting user in case of an error
           }
          } finally {
            setDepLoading(false) // Resetting the loading state after API call
          }
        };
    
        fetchDepartments(); // Fetching department details on component mount
      }, []); // Dependency array to ensure the effect runs once on component mount

      const handleChange = (e) => {
        const {name, value} = e.target; // Destructuring the name and value from the event
        setDepartment({...department,[name] : value}) // Updating the specific field in the department state
    }

    const handleSubmit = async (e) => {
        e.preventDefault() // Preventing default form submission
        try {
            const response = await axios.put(`http://localhost:3000/api/department/${id}`, 
                department, // Sending updated department data
                {
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem('token')}` // Adding authorization header with token
                }
            })
            if(response.data.success){
                navigate("/admin-dashboard/departments") // Navigating to departments list page on success
            }

        } catch(error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error) // Alerting user in case of an error
            }
        }
    }

  return (
    <>
    {depLoading ? 
    <div>Loading ...</div> : // Displaying a loading message if data is being fetched
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h2 className="text-2xl font-bold mb-6">Edit Department</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <label
            htmlFor="depname"
            className="text-sm font-medium text-gray-700"
            >
                Department Name 
            </label>
            <input
                type="text"
                name="dep_name" // Input field for department name
                onChange={handleChange} // Handling change in input field
                value={department.dep_name} // Setting value from state
                placeholder="Department Name"
                className="mt-1 w-full p-2 border-gray-300 rounded-md"
                required // Making this field required
                />
        </div>

        <div className="mt-3">
            <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
                >
                    Description
                </label>
                <textarea
                    name="description" // Textarea for department description
                    placeholder="Description"
                    onChange={handleChange} // Handling change in textarea
                    value={department.description} // Setting value from state
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    rows="4" // Number of rows for the textarea
                    />
        </div>

        <button
            type="submit" // Button to submit the form
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
            >
                Edit Department
        </button>
      </form>
    </div>
    }</>
  )
}

export default EditDepartment
