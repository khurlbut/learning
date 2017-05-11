"use strict";

const 
  fs = require('fs'),
  filename = process.argv[2];
if (!filename) {
  throw Error('A file to watch must be specified');
}
fs.watch('target.txt', function() {
  console.log("File 'target.txt' just changed!");
});
console.log("File 'target.txt' is being watched...");
