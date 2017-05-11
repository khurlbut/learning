"use strict";

var express = require("express");
var path = require("path");

var app = express();

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("index", {
    message:  "Hey everyone: use SUDO to install the EJS module!."
  });
});

app.listen(3000);
