const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  seats: [String],
});

module.exports = mongoose.model("Booking", bookingSchema);
