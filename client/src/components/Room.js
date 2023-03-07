import React, { useState } from "react";
import { Modal, Button, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="row room">
      <div className="col-md-4">
        <img src={room.imageurls[0]} alt="html5" className="smallimg" />
      </div>
      <div className="col-md-7 text-left">
        <h1>{room.name}</h1>
        <p>Số người : {room.maxcount}</p>
        <p>Loại phòng : {room.type}</p>
        <p>Liên lạc : {room.phonenumber}</p>
        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/booking/${room._id}/${fromDate}/${toDate}`}>
              <button className="btn mx-2">Đặt phòng</button>
            </Link>
          )}
          <button className="btn" onClick={handleShow}>
            Chi tiết phòng
          </button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 bigimg" src={url} alt="html5" />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <br />
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
