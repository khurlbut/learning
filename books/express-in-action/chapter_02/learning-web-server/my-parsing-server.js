"use strict";

var http = require("http");

function requestHandler(req, res) {
  if (req.url === "/") {
    res.end("Welcome to the Home Page!");
  } else if (req.url === '/about') {
    res.end("Welcome to the About Page.");
  } else {
    res.end('Error! File not found');
  }
}

var server = http.createServer(requestHandler);

server.listen(3000);
