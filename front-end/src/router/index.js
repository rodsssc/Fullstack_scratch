
import { Routes,Route} from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Contact from '../pages/contact';
import Student from '../pages/student';
import Add_Student from '../pages/add_student';
import Update_Student from '../pages/update_student';


export default function MyRouter(){

    return(
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about-us" element={<About/>}/>
            <Route path="/contact-us" element={<Contact/>}/>
            <Route path="/student" element={<Student/>}/>
            <Route path="/student/create" element={<Add_Student/>}/>
            <Route path="/student/:id/update" element={<Update_Student/>}/>

        </Routes>
    );
}