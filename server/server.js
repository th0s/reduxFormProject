// Library / Helper Imports
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

app.post("/userAssignments", (req, res) => {
  if (req.body.state.serverMsg === "Success!") {
    res.send("200");
  } else if (req.body.state.serverMsg === "Server Waiting for input...") {
    res.send("0");
  } else {
    res.send("404");
  }
});

// Exporting app for testing purposes.
module.exports = app;
