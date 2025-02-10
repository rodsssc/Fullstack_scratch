import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../components/loading";

export default function Student() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchStudents = (query = "") => {
        const url = query.length > 0 
            ? `http://127.0.0.1:8000/api/students/search/${query}` 
            : "http://127.0.0.1:8000/api/student";

        axios.get(url)
            .then(res => {
                setStudents(Array.isArray(res.data) ? res.data : res.data.data || []);
            })
            .catch(error => {
                console.error("Error fetching students:", error);
                setStudents([]);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.trim();
        setSearchQuery(query);

        fetchStudents(query);
    };

    const deleteStudent = (e, id) => {
        e.preventDefault();

        if (!window.confirm("Are you sure you want to delete this student?")) return;

        axios.delete(`http://127.0.0.1:8000/api/student/${id}`)
            .then(res => {
                alert(res.data.message);
                setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            })
            .catch(error => {
                console.error("Error deleting student:", error);
            });
    };

    if (loading) return <Loading />;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">
                            <h4>
                                Student List
                                <Link to="/student/create" className="btn btn-primary float-end">
                                    Add Student
                                </Link>
                            </h4>
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Search students..."
                                value={searchQuery}
                                onChange={handleSearch}
                            />
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
                                    {students.length > 0 ? (
                                        students.map(student => (
                                            <tr key={student.id}>
                                                <td>{student.id}</td>
                                                <td>{student.name}</td>
                                                <td>{student.course}</td>
                                                <td>{student.email}</td>
                                                <td>{student.phone}</td>
                                                <td>
                                                    <Link to={`/student/${student.id}/update`}>
                                                        <button className="btn btn-primary">Edit</button>
                                                    </Link>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={(e) => deleteStudent(e, student.id)}>
                                                        Delete
                                                    </button>
                                                </td>
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
