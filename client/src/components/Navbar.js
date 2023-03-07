import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

// const user = JSON.parse(localStorage.getItem("currentUser"));

// useEffect =
// (() => {
//   setUser(JSON.parse(localStorage.getItem("currentUser")));
// },
// []);
function Navbar() {
  // const [user, setUser] = useState("Tai Quach");

  // setUser(JSON.parse(localStorage.getItem("currentUser").username));
  const { auth } = useAuth();
  // const { setAuth } = useAuth();
  // const user = JSON.parse(localStorage.getItem("currentUser"));
  const [username, setUsername] = useState(false);
  // console.log(auth);
  // const currentUser = localStorage.getItem("currentUser");
  // if (currentUser) {
  //   auth(JSON.parse(currentUser));
  // }

  // useEffect(() => {
  //   setUsername(true);
  //   console.log("hi");
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setUsername(false);
    window.location.href = "/login";
  };
  // console.log("hii");

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/home">
          Booking Hotel
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav">
            {auth ? (
              <>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <FaUserAlt />
                    {auth?.email}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="/profile">
                        Profile
                      </a>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
                {/* <p style={{ color: "white" }}>{user.username}</p> */}

                {/* <li className="nav-item">
                    <a className="nav-link" href="/login">
                      Đăng nhập
                    </a>
                  </li> */}
              </>
            ) : (
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/register">
                    Đăng ký
                  </a>
                </li>

                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Đăng nhập
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
