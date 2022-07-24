 import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import Navbar from '../component/Navbar';
import Home from '../component/pages/Home';
import Rooms from '../component/pages/Rooms';
import Login from '../component/pages/Login';
import Contact from '../component/pages/Contact'
import Signup from '../component/pages/Signup';
import ForgetPassword from '../component/pages/ForgetPassword';
import Profile from '../component/pages/Profile';
import Dashboard from '../component/pages/Dashboard';
import CreateRoom from '../component/pages/Createroom';
import BlockDetails from '../component/pages/BlockDetails'
import React from 'react';
import {Cookies } from 'react-cookie';
import Tokenvarify from '../function/function'

const PrivateComponent=()=>{
    <Tokenvarify render='/login'/>
    const cookies=new Cookies()
    const token=cookies.get('token')
    return(
        token?<Outlet></Outlet>:<Navigate to='/login'></Navigate>
    )
}

const RouterCom = () => {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/rooms' element={<Rooms />} />
                    <Route path='/#about' element={<Home />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route element={<PrivateComponent></PrivateComponent>}>
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/createroom' element={<CreateRoom />} />
                    </Route>
                    <Route path='/blockDetails' element={<BlockDetails/>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/forgetPassword' element={<ForgetPassword />} />
                    <Route path='*' element={<h1>Working On it</h1>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default RouterCom;
