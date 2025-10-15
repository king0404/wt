const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/eventDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema & Model
const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  location: String,
});
const Event = mongoose.model("Event", eventSchema);

// CRUD APIs

// Get all events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add event
app.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.send(newEvent);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete event
app.delete("/events/:id", async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
