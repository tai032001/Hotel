const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());

const dbConfig = require("./database.js");

const roomRoute = require("./routes/roomsRoute");
const userRoute = require("./routes/userRoute");
const bookingRoute = require("./routes/bookingRoute");
app.use("/api/room", roomRoute);
app.use("/api/user", userRoute);
app.use("/api/booking", bookingRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

// const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () => {
// });
