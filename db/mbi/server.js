// server.js
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`🎬 Server running on http://localhost:${PORT}`)
);
