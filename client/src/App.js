import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashBoard from "./screen/DashBoard";
import BookingScreen from "./screen/BookingScreen";
import LoginScreen from "./screen/LoginScreen";
import RegisterScreen from "./screen/RegisterScreen";
import AdminScreen from "./screen/AdminScreen";
import React from "react";
import ProfileScreen from "./screen/ProfileScreen";
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<AdminScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/home" element={<DashBoard />} />
          <Route
            path="/booking/:roomid/:fromDate/:toDate"
            element={<BookingScreen />}
          />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
