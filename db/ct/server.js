// server.js
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// ✅ MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/contactDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Schema & Model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// CRUD Routes
app.get("/api/contacts", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

app.post("/api/contacts", async (req, res) => {
  const contact = new Contact(req.body);
  await contact.save();
  res.json({ message: "Contact added successfully" });
});

app.put("/api/contacts/:id", async (req, res) => {
  await Contact.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Contact updated successfully" });
});

app.delete("/api/contacts/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted successfully" });
});

// ✅ Serve index.html manually
app.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "public", "index.html"),
    "utf8",
    (err, data) => {
      if (err) res.status(500).send("Error loading page");
      else res.send(data);
    }
  );
});

// ✅ Serve app.js manually
app.get("/app.js", (req, res) => {
  fs.readFile(path.join(__dirname, "public", "app.js"), "utf8", (err, data) => {
    if (err) res.status(500).send("Error loading app.js");
    else res.type("application/javascript").send(data);
  });
});

// Start Server
const PORT = 3024;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
