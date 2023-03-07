import axios from "axios";
import React, { useState } from "react";
import Error from "../components/Error";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userLogin = {
      email,
      password,
    };
    try {
      const res = await axios.post(
        `//localhost:5000/api/user/login`,
        userLogin
      );
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      setAuth(JSON.parse(localStorage.getItem("currentUser")));
      // console.log(res.data);
      navigate("/home");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        {error && <Error message={"Login Failed"} />}
        <div className="room">
          <h1 style={{ textAlign: "center" }}>Login</h1>

          <input
            type={"text"}
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />

          <input
            type={"text"}
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />

          <button
            style={{ marginTop: "10px" }}
            className="btn"
            onClick={handleLogin}
          >
            Đăng Nhập
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
