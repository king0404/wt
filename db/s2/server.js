// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(cors()); // allow frontend requests
app.use(express.json()); // parse JSON bodies

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/employeeDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Schema
const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  salary: Number,
});
const Employee = mongoose.model("Employee", employeeSchema);

// API Routes
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    const emp = new Employee(req.body);
    await emp.save();
    res.json(emp);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(emp);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    res.json(emp);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Serve index.html manually
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Start server
const port = 8080;
app.listen(port, () =>
  console.log(`🚀 Server running at http://localhost:${port}`)
);
