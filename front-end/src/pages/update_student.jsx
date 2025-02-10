import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/loading";

export default function Update_Student() {
    // Get the student ID from the URL parameters
    const { id } = useParams();
    // Hook for navigating programmatically
    const navigate = useNavigate();

    // State to hold student data
    const [student, setStudent] = useState({
        name: "",
        course: "",
        email: "",
        phone: "",
    });
    // State to hold form validation errors
    const [inputError, setError] = useState({});
    // State to track loading status
    const [loading, setLoading] = useState(true);

    // Fetch student data from the API when the component mounts or when the 'id' changes
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/student/${id}`)
            .then(res => {
                console.log("API Response:", res.data); // Debugging log
                setStudent(res.data.student || res.data); // Handle missing 'student' object
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching student:", error);
                setLoading(false);
            });
    }, [id]);

    // Function to handle input changes and update state dynamically
    const handleInput = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    // Function to handle form submission and update student data
    const updateStudent = (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        setLoading(true); // Set loading to true while processing

        axios.put(`http://127.0.0.1:8000/api/student/${id}`, student)
            .then(res => {
                alert(res.data.message); // Show success message
                navigate('/student'); // Redirect to student list page
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setError(error.response.data.errors); // Set validation errors
                }
            })
            .finally(() => setLoading(false)); // Reset loading status
    };

    // Show a loading spinner while data is being fetched
    if (loading) {
        return <Loading />;
    }

   

    return (
        
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h4>Update Student
                        <span>
                            <Link to="/student">
                                <button className="btn btn-secondary float-end m-0">Back</button>
                            </Link>
                        </span>
                    </h4>
                </div>

                <div className="card-body">
                    <form onSubmit={updateStudent}>
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
                                {loading ? "Updating..." : "Update Student"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
