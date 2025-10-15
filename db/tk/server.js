const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose
  .connect("mongodb://localhost:27017/taskdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const TaskSchema = new mongoose.Schema({
  title: String,
  done: Boolean,
});
const Task = mongoose.model("Task", TaskSchema);

// CRUD routes
app.get("/tasks", async (req, res) => res.json(await Task.find()));
app.post("/tasks", async (req, res) => res.json(await Task.create(req.body)));
app.put("/tasks/:id", async (req, res) =>
  res.json(await Task.findByIdAndUpdate(req.params.id, req.body, { new: true }))
);
app.delete("/tasks/:id", async (req, res) =>
  res.json(await Task.findByIdAndDelete(req.params.id))
);

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
