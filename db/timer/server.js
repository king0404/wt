const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/quizDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema and Model
const resultSchema = new mongoose.Schema({
  score: Number,
  date: { type: Date, default: Date.now },
});
const Result = mongoose.model("Result", resultSchema);

// API endpoint to save result
app.post("/saveResult", async (req, res) => {
  try {
    const newResult = new Result({ score: req.body.score });
    await newResult.save();
    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ success: false, error: err });
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
