import React,{ useEffect } from "react";
import { Link } from "react-router-dom";
import axios  from 'axios';
import { useState } from "react";

export default function Student(){

    useEffect(() => {
        
        axios.get('http://127.0.0.1:8000/api/students').then(res => {
            setStudent(res.data)
            console.log(res)
            
        })
  


    },[]);

    // const idStudent = 1
    // const[showStudent,setShowStudent] = useState([1])
    const[students,setStudent] = useState([])
    


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="student-header">
                            <h4>
                                Student List 
                                <Link to="/student" className="btn btn-info float-end">Add student</Link>
                            </h4>
                        </div>

                        <div className="card-body">
                            <table className="table table-stripped">
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
                                    {students.map(student => <tr key={student.id}>
                                        <td >{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.course}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td><button className="btn btn-primary">Edit</button></td>
                                        <td><button className="btn btn-danger">Delete</button></td>
                                        </tr>)}
                                  
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
}