var fs = require('fs');

console.log("Advent of code 2023 - Day 01!");

// Read filename as extra argument
let filename = process.argv[2];
console.log("Input File : " + filename);

// Read input file
let file_data = String(fs.readFileSync(filename));
console.log("File Content :\n" + file_data);

// Split into lines for processing
let cal_data = file_data.split("\n");
console.log(cal_data[0]);


