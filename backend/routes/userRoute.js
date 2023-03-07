const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const newUser = await User.create({
      username,
      password,
      email,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      res.send(user);
    } else {
      return res.status(404).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
