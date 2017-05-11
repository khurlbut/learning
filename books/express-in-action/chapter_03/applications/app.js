"use strict";

var express = require("express");
var http = require("http");
var logger = require("morgan");

var app = express();

app.use(logger("short"));

app.use(function(req, res) {
  console.log("In comes a requres to: " + req.url);
  res.end("Hello, world!");
});

http.createServer(app).listen(3000);

