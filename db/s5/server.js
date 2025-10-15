const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/chatdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Define schema
const MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  time: { type: Date, default: Date.now },
});
const Message = mongoose.model("Message", MessageSchema);

// Routes
app.get("/messages", async (req, res) => {
  const msgs = await Message.find().sort({ time: 1 });
  res.json(msgs);
});

app.post("/messages", async (req, res) => {
  const newMsg = new Message(req.body);
  await newMsg.save();
  res.json(newMsg);
});

app.listen(3000, () =>
  console.log("🚀 Server running at http://localhost:3000")
);
