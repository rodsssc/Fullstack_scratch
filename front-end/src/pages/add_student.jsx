import axios from "axios";
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import Loading from "../components/loading";

export default function Add_Student() {
    
    const [student, setStudent] = useState({
        name: "",
        course: "",
        email: "",
        phone: "",
    });
    
    const navigate = useNavigate();
    const [inputError, setError] = useState({});
    const [loading, setLoading] = useState(false); // <-- Added loading state

    // Handle input field change
    const handleInput = (e) => {
        e.persist();
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    // Submit data to server
    const saveStudent = (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone,
        };

        axios.post('http://127.0.0.1:8000/api/student', data)
            .then(res => {
                alert(res.data.message);
                setStudent({ name: "", course: "", email: "", phone: "" }); // Reset form
                setError({});
                navigate('/student');
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setError(error.response.data.errors);
                }
            })
            .finally(() => {
                setLoading(false); // Stop loading
            });
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h4>Add Student 
                        <span>
                            <Link to="/student">
                                <button className="btn btn-secondary float-end m-0">Back</button>
                            </Link>
                        </span>
                    </h4> 
                </div>
                {/* Show Loading if true */}
                {loading && <Loading />}
                <div className="card-body">
                    
                    <form onSubmit={saveStudent}>
                        <div className="form-group mb-3">
                            <label>Name</label>
                            <input type="text" className="form-control" name="name" value={student.name} onChange={handleInput} placeholder="Enter Name" />
                            <span className="text-danger">{inputError.name}</span>
                        </div>

                        <div className="form-group mb-3">
                            <label>Course</label>
                            <input type="text" className="form-control" name="course" value={student.course} onChange={handleInput} placeholder="Enter Course" />
                            <span className="text-danger">{inputError.course}</span>
                        </div>

                        <div className="form-group mb-3">
                            <label>Email</label>
                            <input type="text" className="form-control" name="email" value={student.email} onChange={handleInput} placeholder="Enter Email" />
                            <span className="text-danger">{inputError.email}</span>
                        </div>

                        <div className="form-group mb-3">
                            <label>Phone</label>
                            <input type="text" className="form-control" name="phone" value={student.phone} onChange={handleInput} placeholder="Enter Phone number" />
                            <span className="text-danger">{inputError.phone}</span>
                        </div>

                        <div className="form-group mb-3">
                            <button className="btn btn-primary" disabled={loading}>
                                {loading ? "Adding..." : "Add Student"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
