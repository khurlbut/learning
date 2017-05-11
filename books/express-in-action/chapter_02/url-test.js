"use strict";

var url = require("url");
var parsedURL = url.parse("http://www.example.com/profile?name=Kevin");

console.log("protocol:\t" + parsedURL.protocol);
console.log("host:\t\t" + parsedURL.host);
console.log("query:\t\t" + parsedURL.query);

