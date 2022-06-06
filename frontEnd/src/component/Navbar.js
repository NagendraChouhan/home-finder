import { NavLink } from 'react-router-dom';
import logo from '../logo.svg'

function Navbar(){
    const styles=({isActive})=>{return {color:isActive?'red':''}}
    function handleDisplayOnCLick() {
        var x = document.getElementsByClassName("nav-bar-link-div")[0];
        if (x.style.display === "block") {
          x.style.display = "none";
        } else {
          x.style.display = "block";
        }
      }
    return(
        <header>
            <nav className='nav-bar'>
                <div className='nav-bar-link-div-mobile'>
                    <span onClick={handleDisplayOnCLick}>&#9776;</span>
                </div>
                <div className='nav-bar-name-div'>
                    <img src={logo} alt='company logo'/>
                    <h2>Room Finding</h2>
                </div>
                <div className='nav-bar-link-div'>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/' style={styles}>Home</NavLink>
                    </span>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/about' style={styles}>About</NavLink>
                    </span>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/contact' style={styles}>Contact</NavLink>
                    </span>
                    <span className='nav-bar-link-div-span'>
                        <NavLink to='/login' style={styles}>Login</NavLink>
                    </span>
                </div>
            </nav>
        </header>
    )
}

export default Navbar;