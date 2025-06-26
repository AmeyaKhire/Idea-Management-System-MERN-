import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const View = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/employee/${id}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }
                );
                console.log(response.data);
                if (response.data.success) {
                    setEmployee(response.data.employee);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            }
        };

        fetchEmployee();
    }, [id]);

    return (
        <>
            {employee ? (
                <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md">
                    <h2 className="text-2xl font-bold mb-8 text-center">
                        Employee Details
                    </h2>
                    <div className="flex flex-col space-y-5"> {/* Changed to flex-col for vertical stacking */}
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Name:</p>
                            <p className="font-medium">{employee.userId.name}</p>
                        </div>
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Employee ID:</p>
                            <p className="font-medium">{employee.employeeId}</p>
                        </div>
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Email:</p>
                            <p className="font-medium">{employee.userId.email}</p> {/* Added Email */}
                        </div>
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Department:</p>
                            <p className="font-medium">{employee.department.dep_name}</p>
                        </div>
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Designation:</p>
                            <p className="font-medium">{employee.designation}</p> {/* Added Designation */}
                        </div>
                       
                    </div>
                </div>
            ) : (
                <div>Loading ....</div>
            )}
        </>
    );
};

export default View;



 {/* <div className="flex space-x-3">
                            <p className="text-lg font-bold">Date of Birth:</p>
                            <p className="font-medium">
                                {new Date(employee.dob).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Gender:</p>
                            <p className="font-medium">{employee.gender}</p>
                        </div>
                   
                        <div className="flex space-x-3">
                            <p className="text-lg font-bold">Marital Status:</p>
                            <p className="font-medium">{employee.maritalStatus}</p>
                        </div> */}