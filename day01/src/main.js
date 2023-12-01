var fs = require('fs');

console.log("Advent of code 2023 - Day 01!");

var filename = process.argv[2];

console.log("Input File : " + filename);

fs.readFile(filename, (err, data) => {
    if (err) throw err;
    console.log("File Content :\r\n" + data);
});
