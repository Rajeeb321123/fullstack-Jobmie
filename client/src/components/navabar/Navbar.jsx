// NAVBAR COMPONENT

import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from "../../utils/newRequest";
import Cookies from 'js-cookie';




import './Navbar.scss';



const Navbar = () => {

  const [active, setActive] = useState(false);

  // for opening and closing user, logout..
  const [open, setOpen] = useState(false);


  const { pathname } = useLocation();

  const navigate = useNavigate();




  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }

  useEffect(() => {

    // for changing navbar color when scroll down
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    }
  }, []);





  // getting the accessToken from local Storage
  // changing string back to json
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const accessToken = Cookies.get("accessToken");

  //FOR LOGOUT method
  const handleLogout = async () =>{
    try{
      
      // logout in backend will delete our coookie
      await newRequest(accessToken).post("/auth/logout");

      localStorage.setItem("currentUser", null);

      navigate('/');

    }
    catch(err){

    }
  }



  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
    <div className="container">
      <div className="logo">
        <Link className="link" to="/">
          <span className="text">Jobmie</span>
        </Link>
        <span className="dot">.</span>
      </div>
      <div className="links">
        <span>Jobmie Business</span>
        <span>Explore</span>
        <span>English</span>
        {!currentUser?.isSeller && <span>Become a Seller</span>}
        {currentUser ? (
          <div className="user" onClick={() => setOpen(!open)}>
            <img src={currentUser.img || "/img/noavatar.jpg"} alt="" />
            <span>{currentUser?.username}</span>
            {open && (
              <div className="options">
                {currentUser.isSeller && (
                  <>
                    <Link className="link" to="/mygigs">
                      Gigs
                    </Link>
                    <Link className="link" to="/add">
                      Add New Gig
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  Orders
                </Link>
                <Link className="link" to="/messages">
                  Messages
                </Link>
                <Link className="link" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="link">Sign in</Link>
            <Link className="link" to="/register">
              <button>Join</button>
            </Link>
          </>
        )}
      </div>
    </div>
    {(active || pathname !== "/") && (
      <>
        <hr />
        <div className="menu">
          <Link className="link menuLink" to="/">
            Graphics & Design
          </Link>
          <Link className="link menuLink" to="/">
            Video & Animation
          </Link>
          <Link className="link menuLink" to="/">
            Writing & Translation
          </Link>
          <Link className="link menuLink" to="/">
            AI Services
          </Link>
          <Link className="link menuLink" to="/">
            Digital Marketing
          </Link>
          <Link className="link menuLink" to="/">
            Music & Audio
          </Link>
          <Link className="link menuLink" to="/">
            Programming & Tech
          </Link>
          <Link className="link menuLink" to="/">
            Business
          </Link>
          <Link className="link menuLink" to="/">
            Lifestyle
          </Link>
        </div>
        <hr />
      </>
    )}
  </div>
);
}

export default Navbar