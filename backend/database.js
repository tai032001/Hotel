const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGO_URL, () => {
//   console.log("Connected to MongoDB");
// });

var mongooseURL =
  "mongodb+srv://tai032001:Hungtaiquach1@cluster0.i3ynosd.mongodb.net/BookingHotel";

mongoose.connect(mongooseURL, {
  useUnifiedTopology: true,
  useNewURlParser: true,
});

var connection = mongoose.connection;

connection.on("error", () => {
  console.log("Connection Failed");
});

connection.on("connected", () => {
  console.log("Connection Success");
});

module.exports = mongoose;
