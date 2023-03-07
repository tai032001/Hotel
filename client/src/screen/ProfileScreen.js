import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import TabPane from "antd/es/tabs/TabPane";
import Loading from "../components/Loading.tsx";

export default function ProfileScreen() {
  const user = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className=" m-3">
      <Tabs defaultActiveKey="1">
        <TabPane key={"1"} tab="Profile">
          <h1>Name: {user.username}</h1>
          <h1>Email:{user.email}</h1>
          <h1>isAdmin:{user.isAdmin ? "yes" : "no"}</h1>
          <button className="btn">Get Admin Access</button>
        </TabPane>
        <TabPane key={"2"} tab="Booking">
          <UserBooking />
        </TabPane>
      </Tabs>
    </div>
  );
}
export function UserBooking() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBooking] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchRooms = async () => {
    try {
      const rooms = await axios.post(
        "//localhost:5000/api/booking/getBookingByUserId",
        { userid: user._id }
      );
      setBooking(rooms.data);
      console.log(rooms.data);
    } catch (error) {
      setLoading(true);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRooms();
  });
  return (
    <div>
      {loading ? (
        <h1>
          <Loading />
        </h1>
      ) : (
        bookings.map((booking) => {
          return (
            <div className="row">
              <div className="col-md-6">
                <div className="room">
                  <h1>Booking id: {booking._id}</h1>
                  <h1>Check in: {booking.fromdate}</h1>
                  <h1>Check out: {booking.todate}</h1>
                  <h1>
                    Status: {booking.status === "booked" ? "ĐÃ ĐẶT" : "ĐÃ HỦY"}
                  </h1>
                  <div style={{ float: "right" }}>
                    <button className="btn">Cancel Booking</button>
                  </div>
                  <br></br>
                  {/* <div style={{ float: "right" }}>
                    <button className="btn">Cancel Booking</button>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
