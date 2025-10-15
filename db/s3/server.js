const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/movieDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema
const bookingSchema = new mongoose.Schema({
  seats: [String],
  time: { type: Date, default: Date.now },
});
const Booking = mongoose.model("Booking", bookingSchema);

// Route
app.post("/book", async (req, res) => {
  const booking = new Booking({ seats: req.body.seats });
  await booking.save();
  res.json({ message: "Booked Successfully", seats: req.body.seats });
});

app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
