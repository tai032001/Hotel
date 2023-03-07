import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Loading from "../components/Loading.tsx";
import Error from "../components/Error";
// import Success from "../components/Success";

function RegisterScreen() {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  // const [success, setSuccess] = useState();

  const navigate = useNavigate();
  const validateEmail = () => {
    const regEx = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    if (regEx.test(email)) {
      // alert("email is valid");
    } else if (!regEx.test(email)) {
      alert("Email is invalid");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password === cpassword) {
      const newUser = {
        username: username,
        password: password,
        email: email,
      };
      // console.log(newUser);
      validateEmail();
      //test lai voi newUser
      try {
        // setLoading(true);
        const res = await axios.post(
          "//localhost:5000/api/user/register",
          newUser
        );
        // setLoading(false);
        // console.log(res.data);
        setName("");
        setEmail("");
        setCpassword("");
        setPassword("");
        navigate("/login");
      } catch (error) {
        // setLoading(false);
        setError(true);
        console.log(error);
      }
    } else {
      alert("password and confirm password not match");
    }
  };
  return (
    <div>
      <div className="row justify-content-center mt-5">
        <div className="col-md-5">
          {error && <Error message={"Registration Failed"} />}

          <div className="room">
            <h1 style={{ textAlign: "center" }}>Register</h1>

            <input
              type={"text"}
              className="form-control"
              placeholder="name"
              value={username}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <input
              type={"text"}
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
            <input
              type={"text"}
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
            <input
              type={"text"}
              className="form-control"
              placeholder="confirm password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              required
            />
            <button
              style={{ marginTop: "10px" }}
              className="btn"
              onClick={handleRegister}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
