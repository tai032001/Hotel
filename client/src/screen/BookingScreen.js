import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading.tsx";
import moment from "moment";
import useAuth from "../hooks/useAuth";
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";
import { Switch } from "antd";

function BookingScreen() {
  const navigate = useNavigate();
  //lay room id tu du lieu hien tai dung useParams
  const { roomid, fromDate, toDate } = useParams();
  const { auth } = useAuth();
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const toMoment = moment(toDate, "DD-MM-YYYY");
  const fromMoment = moment(fromDate, "DD-MM-YYYY");
  const totalDays = moment.duration(toMoment.diff(fromMoment)).asDays() + 1;
  const [totalAmount, setTotalAmount] = useState();

  useEffect(() => {
    async function fetchRoom() {
      try {
        setLoading(true);
        const res = (
          await axios.post("//localhost:5000/api/room/getroombyID", {
            roomid: roomid,
          })
        ).data;
        setTotalAmount(res.rentperday * totalDays);
        setRoom(res);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    }
    fetchRoom();
  }, [roomid, totalDays]);

  // const bookNow = async (e) => {
  //   e.preventDefault();
  //   const bookingDetails = {
  //     room,
  //     roomid,
  //     userid: auth._id,
  //     fromdate: fromDate,
  //     todate: toDate,
  //     totalamount: totalAmount,
  //     totaldays: totalDays,
  //   };
  //   try {
  //     const res = await axios.post(
  //       `//localhost:5000/api/booking/bookRoom`,
  //       bookingDetails
  //     );
  //     navigate("/home");
  //   } catch (error) {
  //     alert(error);
  //   }
  // };
  const onToken = async (token) => {
    // console.log(token);
    // e.preventDefault();
    const bookingDetails = {
      room,
      roomid,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromdate: fromDate,
      todate: toDate,
      totalamount: totalAmount,
      totaldays: totalDays,
    };
    try {
      const res = await axios.post(
        `//localhost:5000/api/booking/bookRoom`,
        bookingDetails
      );
      console.log(res.data);
      Swal.fire("Congratulation", "Booked successfully", "success");
      navigate("/home");
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  return (
    <div className="m-5">
      {loading ? (
        <h1>
          <Loading />
        </h1>
      ) : error ? (
        <h1>
          <Loading />
        </h1>
      ) : (
        <div className="row justify-content-center mt-5 room">
          <div className="col-md-6">
            <h1>{room.name}</h1>
            <img src={room.imageurls[0]} alt="html5" className="bigimg" />
          </div>
          <div className="col-md-6">
            <div className="bookingdetails">
              <h1>Chi tiết đặt phòng</h1>
              <hr />
              <b>
                <p>
                  Name: {JSON.parse(localStorage.getItem("currentUser")).email}
                </p>
                <p>From: {fromDate}</p>
                <p>To: {toDate}</p>
                <p>MaxCount: {room.maxcount} People</p>
              </b>
            </div>

            <div className=" bookingdetails">
              <b>
                <hr />
                <h1>Amount:</h1>
                <p>Total days: {totalDays}</p>
                <p>Rentperday: {room.rentperday}$</p>
                <p>Total Amount: {totalAmount}$</p>
              </b>
            </div>

            <div style={{ float: "right" }}>
              <StripeCheckout
                email={JSON.parse(localStorage.getItem("currentUser")).email}
                amount={totalAmount * 100}
                token={onToken}
                stripeKey="pk_test_51MgKFpIgNG2amp4bxoPkQ7jddZ2abo3psl5q1zvn0rKISuEuw316j1f389LeWrHzW8c9Awp1dCdeo3OVNBuzdacU00LiavGT6S"
              >
                <button className="btn">Book Now</button>
              </StripeCheckout>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingScreen;
