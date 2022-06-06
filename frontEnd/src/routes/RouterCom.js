import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from '../component/Navbar';
import Login from '../component/pages/Login';
import Contact from '../component/pages/Contact'
import Rooms from '../component/pages/Rooms';
import Signup from '../component/pages/Signup';
import ForgetPassword from '../component/pages/ForgetPassword';


function RouterCom(){
    return(
        <>
            <BrowserRouter>
            <Navbar></Navbar>
                <Routes>
                    <Route path='/' element={<Rooms/>}/>
                    <Route path='/about' element={<h1>hello from About</h1>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/forgetPassword' element={<ForgetPassword/>}/>
                    <Route path='*' element={<h1>Working On it</h1>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouterCom;