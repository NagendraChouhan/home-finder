import { NavLink, useNavigate } from "react-router-dom";
import React from "react";
import { Cookies } from "react-cookie";
import img from "../pexels-anthony-133372.jpg";

const Navbar = () => {
  const styles = ({ isActive }) => {
    return {
      width: "97%",
      display: "block",
      color: "red",
      padding: "2% 10px",
      color: isActive ? "red" : "",
    };
  };
  function handleDisplayOnCLick() {
    console.log(
      `onClick={handleDisplayOnCLick} window.innerWidth;= ${window.innerWidth}`
    );
    if (window.innerWidth < 809) {
      var x = document.getElementsByClassName("nav-bar-link-div")[0];
      window.addEventListener("click", function (e) {
        if (!document.getElementsByClassName("nav-bar")[0].contains(e.target)) {
          if (x.style.display === "block") {
            x.style.display = "none";
          }
        }
      });
      if (x.style.display === "block") {
        x.style.display = "none";
      } else {
        x.style.display = "block";
      }
    }
  }
  const cookies = new Cookies();
  const token = cookies.get("token");
  console.log(`Token from navigation ${token}`);
  const navigate = useNavigate();
  const logout = async () => {
    cookies.remove("admin");
    cookies.remove("token");
    let result = await fetch("/blogout", {
      method: "delete",
      body: JSON.stringify({ token }),
      headers: {
        "content-Type": "application/json",
      },
    });
    navigate("/login");
    console.log(`result from navbar ===${result}`);
  };
  // tokenvarify('/login')

  //var w = window.innerWidth;

  return (
    <header>
      <nav className="nav-bar">
        <div className="nav-bar-link-div-mobile">
          <span onClick={handleDisplayOnCLick}>&#9776;</span>
        </div>
        <div className="nav-bar-name-div">
          <span
            onClick={() => {
              if (window.innerWidth < 809) {
                document.getElementsByClassName(
                  "nav-bar-link-div"
                )[0].style.display = "none";
              }
              navigate("/");
            }}
            style={{
              alignSelf: "center",
              fontSize: "xxx-large",
              color: "#00beffd1",
              cursor: "pointer",
            }}
            className="material-symbols-outlined"
          >
            other_houses
          </span>

          <h1
            className="heading"
            style={{
              fontSize: "30px",
              fontFamily: "fangsong",

              margin: "25px 10px 10px 10px",

              textTransform: "capitalize",
            }}
          >
            BL
            <span style={{ textTransform: "lowercase" }}>i've</span>S
          </h1>
        </div>
        <div className="nav-bar-link-div">
          <span
            className="nav-bar-link-div-span"
            onClick={handleDisplayOnCLick}
          >
            <NavLink to="/" style={styles}>
              Home
            </NavLink>
          </span>
          <span
            className="nav-bar-link-div-span"
            onClick={handleDisplayOnCLick}
          >
            <NavLink to="/rooms" style={styles}>
              Rooms
            </NavLink>
          </span>
          {/* <span className='nav-bar-link-div-span'
                    onClick={handleDisplayOnCLick}>
                        <NavLink to='/#about' style={styles}>About</NavLink>
                    </span> */}
          <span
            className="nav-bar-link-div-span"
            onClick={handleDisplayOnCLick}
          >
            <NavLink to="/contact" style={styles}>
              Contact
            </NavLink>
          </span>
          {token && (
            <>
              <span
                className="nav-bar-link-div-span"
                onClick={handleDisplayOnCLick}
              >
                <NavLink to="/profile" style={styles}>
                  Profile
                </NavLink>
              </span>
              <span
                className="nav-bar-link-div-span"
                onClick={handleDisplayOnCLick}
              >
                <NavLink to="/dashboard" style={styles}>
                  Dashboard
                </NavLink>
              </span>
              <span
                className="nav-bar-link-div-span"
                onClick={handleDisplayOnCLick}
              >
                <NavLink to="/login" onClick={logout} style={styles}>
                  Logout
                </NavLink>
              </span>
            </>
          )}
          {!token && (
            <span
              className="nav-bar-link-div-span"
              onClick={handleDisplayOnCLick}
            >
              <NavLink to="/login" style={styles}>
                Login
              </NavLink>
            </span>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
