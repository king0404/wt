const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.static("."));
app.use(bodyParser.json());

// ✅ Updated MongoDB connection (no deprecated options)
mongoose
  .connect("mongodb://127.0.0.1:27017/shoppingDB")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const Item = mongoose.model(
  "Item",
  new mongoose.Schema({
    name: String,
    price: Number,
  })
);

// --- CRUD Routes ---
app.get("/items", async (req, res) => {
  res.json(await Item.find());
});

app.post("/items", async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.json({ message: "Item added" });
});

app.put("/items/:id", async (req, res) => {
  await Item.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Item updated" });
});

app.delete("/items/:id", async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
});

// Start Server
app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
