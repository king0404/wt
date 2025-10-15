// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// Middleware
app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/hospitalDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema and Model
const patientSchema = new mongoose.Schema({
  name: String,
  disease: String,
  admissionDate: String,
});

const Patient = mongoose.model("Patient", patientSchema);

// CRUD Routes
app.get("/api/patients", async (req, res) => {
  const patients = await Patient.find();
  res.json(patients);
});

app.post("/api/patients", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.json({ message: "Patient added successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error adding patient" });
  }
});

app.put("/api/patients/:id", async (req, res) => {
  try {
    await Patient.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Patient updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error updating patient" });
  }
});

app.delete("/api/patients/:id", async (req, res) => {
  try {
    await Patient.findByIdAndDelete(req.params.id);
    res.json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting patient" });
  }
});

// ✅ Instead of express.static — manually send index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Serve app.js manually
app.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "app.js"));
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
