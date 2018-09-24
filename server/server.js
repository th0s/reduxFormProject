// Library / Helper Imports
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.headers.origin) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
  }
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.listen(3001, () => {
  console.log("Listening on port 1337");
});

app.get("/userAssignments", (req, res) => {
  res.send(JSON.stringify("test"));
});

// Exporting app for testing purposes.
module.exports = app;
