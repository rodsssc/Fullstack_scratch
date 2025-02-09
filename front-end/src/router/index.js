
import { Routes,Route} from 'react-router-dom';
import Home from '../pages/home';
import About from '../pages/about';
import Contact from '../pages/contact';
import Student from '../pages/student';


export default function MyRouter(){

    return(
        <Routes>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about-us" element={<About/>}/>
            <Route path="/contact-us" element={<Contact/>}/>
            <Route path="/student" element={<Student/>}/>
        </Routes>
    );
}