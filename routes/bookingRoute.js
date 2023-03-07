const express = require("express");
const router = express.Router();
const Room = require("../models/rooms");
const Booking = require("../models/booking");
const stripe = require("stripe")(
  "sk_test_51MgKFpIgNG2amp4bnN3RWe55VpVvwCFfITzo5CboGk1gl0QGVWaVzZNHEfzRY66ebvvblPhjy4s0xoLSlN4LZbJL00hCoV6SEw"
);
// const { v4: uuidv4 } = require("uuid");

router.post("/getBookingByUserId", async (req, res) => {
  const userid = req.body.userid;
  try {
    const rooms = await Booking.find({ userid: userid });
    return res.send(rooms);
  } catch (error) {
    return res.send(error);
  }
});
router.post("/bookRoom", async (req, res) => {
  const { room, roomid, userid, fromdate, todate, totalamount, totaldays } =
    req.body;
  // try {
  //   const customer = await stripe.customer.create({
  //     email: token.email,
  //     source: token.id,
  //   });
  //   //check not to pay twice
  //   const payment = await stripe.charge.create(
  //     {
  //       amount: totalamount * 100,
  //       customer: customer.source,
  //       receipt_email: token.email,
  //     },
  //     {
  //       idempotencyKey: uuidv4(),
  //     }
  //   );

  // if (payment) {
  try {
    const newBooking = await Booking.create({
      room: room.name,
      roomid,
      userid,
      fromdate,
      todate,
      totalamount,
      totaldays,
      transactionId: "1234",
    });

    const booking = await newBooking.save();

    const roomtemp = await Room.findOne({ _id: roomid });

    roomtemp.currentbookings.push({
      bookingid: booking._id,
      fromdate: fromdate,
      todate: todate,
      userid: userid,
      status: booking.status,
    });
    await roomtemp.save();
    res.send("Booked ok roi do");
  } catch (error) {
    res.send(error);
  }
  // }
  //   res.send("Payment Successful");
  // } catch (error) {
  //   return res.send(error);
  // }
});

module.exports = router;
