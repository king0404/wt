// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/movieDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

// Define schema
const Booking = mongoose.model('Booking', new mongoose.Schema({
  movie: String,
  seats: [String],
  name: String
}));

// Get all bookings (optional)
app.get('/api/bookings', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// Save new booking
app.post('/api/bookings', async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.json(booking);
});

// Start server
const PORT = 3020;
app.listen(PORT, () => console.log('🚀 Server running on http://localhost:${PORT}'));