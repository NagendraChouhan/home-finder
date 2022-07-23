import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../logo.svg'
import React from 'react';
import {Cookies } from 'react-cookie';



const Navbar = () => {
    const styles = ({ isActive }) => { return { color: isActive ? 'red' : '' } }
    function handleDisplayOnCLick() {
        var x = document.getElementsByClassName("nav-bar-link-div")[0];
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }
    const cookies=new Cookies()
    const token=cookies.get('token')
    console.log(`Token from navigation ${token}`)
    const navigate=useNavigate()
    const logout=async()=>{
        cookies.remove('token')
        let result=await fetch('/logout',{
            method:'delete',
            body:JSON.stringify({token}),
            headers:{
                'content-Type':'application/json'
            }
        })
        navigate('/login')
        console.log(`result from navbar ===${result}`)
    }
    // tokenvarify('/login')


  
        //var w = window.innerWidth;
  
    return (
        <header>
            <nav className='nav-bar'>
                <div className='nav-bar-link-div-mobile'>
                    <span onClick={handleDisplayOnCLick}>&#9776;</span>
                </div>
                <div className='nav-bar-name-div'>
                    <img src={logo} alt='company logo' />
                    <h2>Room Finding</h2>
                </div>
                <div className='nav-bar-link-div'>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/' style={styles}>Home</NavLink>
                    </span>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/rooms' style={styles}>Rooms</NavLink>
                    </span>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/about' style={styles}>About</NavLink>
                    </span>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/contact' style={styles}>Contact</NavLink>
                    </span>
                    {token &&
                        <>
                            <span className='nav-bar-link-div-span'>
                                <NavLink to='/profile' style={styles}>Profile</NavLink>
                            </span>
                            <span className='nav-bar-link-div-span'>
                                <NavLink to='/dashboard' style={styles}>Dashboard</NavLink>
                            </span>
                            <span className='nav-bar-link-div-span'>
                                <NavLink to='/login' onClick={logout} style={styles}>Logout</NavLink>
                            </span>
                        </> 
                    }
                    {!token &&<span className='nav-bar-link-div-span'>
                        <NavLink to='/login' style={styles}>Login</NavLink>
                    </span>}
                </div>
            </nav>
        </header>
    )
}

export default Navbar;