import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import Loading from "../components/loading";

export default function Student() {
    // Initialize state as an empty array
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/student')
            .then(res => {
                // Make sure we're setting the state with the correct data
                // Often the API response data is nested under a data property
                setStudents(Array.isArray(res.data) ? res.data : res.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching students:", error);
                setStudents([]); // Set empty array on error
            });
    }, []);

    if(loading) { 
        return (
           <Loading />
        ); 
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Student List 
                                <Link to="/student/create" className="btn btn-primary float-end">Add Student</Link>
                            </h4>
                        </div>

                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Course</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {Array.isArray(students) && students.length > 0 ? (
                                        students.map(student => (
                                            <tr key={student.id}>
                                                <td>{student.id}</td>
                                                <td>{student.name}</td>
                                                <td>{student.course}</td>
                                                <td>{student.email}</td>
                                                <td>{student.phone}</td>
                                                <td><button className="btn btn-primary">Edit</button></td>
                                                <td><button className="btn btn-danger">Delete</button></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="text-center">No students found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}