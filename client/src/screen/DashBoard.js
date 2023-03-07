import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loading from "../components/Loading.tsx";
import moment from "moment";
import { DatePicker } from "antd";
const { RangePicker } = DatePicker;

function DashBoard() {
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRoom, setDuplicateRoom] = useState([]);
  const [roomName, setRoomname] = useState("");
  const [type, setType] = useState("all");
  const filterByDate = (date) => {
    setFromDate(moment(date[0].$d).format("DD-MM-YYYY"));
    setToDate(moment(date[1].$d).format("DD-MM-YYYY"));
    var tempRooms = [];
    var availability = false;

    for (const room of duplicateRoom) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(date[0].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            !moment(moment(date[1].$d).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(date[0].$d).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(date[0].$d).format("DD-MM-YYYY") !== booking.todate &&
              moment(date[1].$d).format("DD-MM-YYYY") !== booking.fromdate &&
              moment(date[1].$d).format("DD-MM-YYYY") !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }
      if (availability === true || room.currentbookings.length === 0) {
        tempRooms.push(room);
      }
      setRoom(tempRooms);
      setDuplicateRoom(tempRooms);
    }
  };

  const filterByName = () => {
    const roomSearch = duplicateRoom.filter((duplicateRoom) =>
      duplicateRoom.name.toLowerCase().includes(roomName.toLowerCase())
    );
    setRoom(roomSearch);
  };
  const filterByType = (e) => {
    // setType(e.target.value);
    if (e !== "all") {
      const roomSearch = duplicateRoom.filter(
        (duplicateRoom) => duplicateRoom.type.toLowerCase() === e.toLowerCase()
      );
      setRoom(roomSearch);
      setType(e);
    } else {
      setRoom(duplicateRoom);
      setType(e);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const res = await axios.get("//localhost:5000/api/room/getallrooms");
        setRoom(res.data);
        setDuplicateRoom(res.data);
        console.log(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="room row mt-5">
        <div className="col-md-4">
          <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate} />
        </div>
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search room name"
            // value={"roomName"}
            onChange={(e) => {
              setRoomname(e.target.value);
            }}
            onKeyUp={filterByName}
            type={"text"}
          ></input>
        </div>
        <div className="col-md-4">
          <select
            className="form-control"
            value={type}
            onChange={(e) => filterByType(e.target.value)}
          >
            <option value={"all"}>All</option>
            <option value={"delux"}>Delux</option>
            <option value={"non-delux"}>Non Delux</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loading />
          </h1>
        ) : (
          room.map((room) => {
            return (
              <div className="col-md-9 mt-2">
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default DashBoard;
