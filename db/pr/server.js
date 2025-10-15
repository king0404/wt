const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/PrCatalogDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Schema & Model
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});
const Product = mongoose.model("Product", productSchema);

// CRUD APIs
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/products", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.send(newProduct);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/products/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.send(updated);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.send({ success: true });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
