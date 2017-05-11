"use strict";

var express = require("express");
var http = require("http");
var logger = require("morgan");

var app = express();

app.use(logger("short"));

app.use(function(req, res, next) {
  console.log("In comes a requres to: " + req.url);
  next();
});

app.use(function(req, res, next) {
  var minute = (new Date()).getMinutes();
  if ((minute % 2) == 0) {
    next();
  } else {
    res.statusCode = 403;
    res.end("Not Authorozed");
  }
});

app.use(function(req, res) {
  res.end("Secret info: the password is 'swordfish'!");
});

http.createServer(app).listen(3000);

