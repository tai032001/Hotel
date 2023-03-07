const express = require("express");

const router = express.Router();

const Room = require("../models/rooms");

router.get("/getallrooms", async (req, res) => {
  try {
    const room = await Room.find({});
    return res.json(room);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

router.post("/getroombyID", async (req, res) => {
  const roomid = req.body.roomid;
  try {
    const room = await Room.findOne({ _id: roomid });
    return res.json(room);
  } catch (error) {
    return res.status(404).json({ message: error });
  }
});

module.exports = router;
