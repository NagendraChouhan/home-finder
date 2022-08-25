import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "../component/Navbar";
import Home from "../component/pages/Home";
import Rooms from "../component/pages/Rooms";
import Login from "../component/pages/Login";
import Contact from "../component/pages/Contact";
import Signup from "../component/pages/Signup";
import ForgetPassword from "../component/pages/ForgetPassword";
import Profile from "../component/pages/Profile";
import Dashboard from "../component/pages/Dashboard";
import CreateRoom from "../component/pages/Createroom";
import BlockDetails from "../component/pages/BlockDetails";
import React, { useState } from "react";
import { Cookies } from "react-cookie";
import Tokenvarify from "../function/function";
import LodindBar from "../component/LodindBar";

const PrivateComponent = () => {
  <Tokenvarify render="/login" />;
  const cookies = new Cookies();
  const token = cookies.get("token");
  return token ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>;
};

const RouterCom = () => {
  const [widthValue, setWidthValue] = useState("0%");
  const [isLoading, setIsLoading] = useState(true);

  const setLoder = (value, disablesValue) => {
    setWidthValue(value);
    if (disablesValue) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  };
  return (
    <>
      <BrowserRouter>
        <Navbar />
        {isLoading && <LodindBar widthValue={widthValue} />}
        <Routes>
          <Route path="/" element={<Home setLoderfun={setLoder} />} />
          <Route path="/rooms" element={<Rooms setLoderfun={setLoder} />} />
          {/* <Route path='/#about' element={<Home />} /> */}
          <Route path="/contact" element={<Contact />} />
          <Route element={<PrivateComponent></PrivateComponent>}>
            <Route
              path="/profile"
              element={<Profile setLoderfun={setLoder} />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard setLoderfun={setLoder} />}
            />
            <Route
              path="/createroom"
              element={<CreateRoom setLoderfun={setLoder} />}
            />
          </Route>
          <Route
            path="/blockDetails"
            element={<BlockDetails setLoderfun={setLoder} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetPassword" element={<ForgetPassword setLoderfun={setLoder} />} />
          <Route path="*" element={<h1>Working On it</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default RouterCom;
