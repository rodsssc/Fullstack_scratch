
import axios from "axios";
import React,{ useState } from "react";
import { Link } from "react-router-dom";
export default function Add_Student() {
    
    //initialize state
    const[student,setStudent] = useState({
        name:"",
        course:"",
        email:"",
        phone:"",
    });

    const [inputError , setError] = useState({});


    //handle input field
    const handleInput = (e) =>{
        e.persist();
        setStudent({...student, [e.target.name]:  e.target.value});
    }

    //submit data to server
    const saveStudent = (e) =>{
        e.preventDefault();

        const data = {
            name: student.name,
            course: student.course,
            email: student.email,
            phone: student.phone
        
            
        }
        //send data to server
        axios.post('http://127.0.0.1:8000/api/student',data)
            .then(res => {
                alert(res.data.message);
            })
            //catch error
            .catch(error => {
                if(error.response){
                    if(error.response.status === 422){
                        setError(error.response.data.errors);
                        
                    }
                }
            });
    }

    return(
       
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h4>Add Student <span><Link to="/student"><button className="btn btn-secondary float-end m-0">Back</button></Link></span></h4> 
                    
                </div>
                <div className="card-body">
                    
                    <form onSubmit={saveStudent}>
                        <div className="form-group mb-3">
                            <label htmlFor="">Name</label>
                            <input type="text" className="form-control" name="name" value={student.name} onChange={handleInput} placeholder="Enter Name" />
                            <span className="text-danger">{inputError.name}</span>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="">Course</label>
                            <input type="text" className="form-control" name="course" value={student.course} onChange={handleInput} placeholder="Enter Course" />
                            <span className="text-danger">{inputError.course}</span>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="">Email</label>
                            <input type="text" className="form-control" name="email" value={student.email} onChange={handleInput} placeholder="Enter Email" />
                            <span className="text-danger">{inputError.email}</span>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="">Phone</label>
                            <input type="text" className="form-control" name="phone" value={student.phone} onChange={handleInput} placeholder="Enter Phone number" />
                            <span className="text-danger">{inputError.phone}</span>
                        </div>
                        <div className="form-group mb-3">
                            <button className="btn btn-primary" >Add Student</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}